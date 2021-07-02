import { BadRequestException, Injectable } from '@nestjs/common';
import { config as configAWS, S3 } from 'aws-sdk';
import { PrismaService } from '../common/services/prisma.service';
import { nanoid } from 'nanoid';
import { plainToClass } from 'class-transformer';
import { AttachmentDto } from './dto/attachment.dto';

@Injectable()
export class AttachmentsService {
  private readonly s3: S3;
  constructor(private readonly prismaService: PrismaService) {
    configAWS.update({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      region: process.env.AWS_REGION,
    });
    this.s3 = new S3();
  }

  async endpointToUpload(input) {
    const allowContentType = ['image/png', 'image/jpg', 'image/jpeg'];
    const hasContentType = allowContentType.find((type) =>
      input.includes(type),
    );
    if (!hasContentType) throw new BadRequestException('Invalid extension');
    const ext = input.split('/')[1];

    //Create attachment in table
    const attachment = await this.prismaService.attachment.create({
      data: {
        contentType: input,
        key: nanoid(),
        ext,
      },
    });

    //AWS: Pre-signing a 'putObject' (asynchronously)
    const params = {
      Key: `${attachment.key}.${attachment.ext}`,
      ContentType: attachment.contentType,
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
      Expires: Number(process.env.AWS_EXPIRATION_TIME),
    };
    const signedUrl = this.s3.getSignedUrl('putObject', params);
    return plainToClass(AttachmentDto, { signedUrl, ...attachment });
  }
}
