import { Injectable } from '@nestjs/common';
import { config as configAWS, S3 } from 'aws-sdk';
import { PrismaService } from '../common/services/prisma.service';
import { uuid } from 'uuidv4';
import { Attachment } from '@prisma/client';
import { AttachmentDirectoryEnum, ParentEnum } from './enums/attachement.enum';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
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

  async createAttachment(
    dataBuffer: Buffer,
    filename: string,
  ): Promise<Attachment> {
    const uploadResult = await this.s3
      .upload({
        Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    return await this.prismaService.attachment.create({
      data: {
        key: uploadResult.Key,
        url: uploadResult.Location,
      },
    });
  }
  // async createImage(input): Promise<AttachmentDto> {
  //   console.log('input', input);
  //   const attachment = await this.createAttachment({
  //     ...input,
  //     parentType: ParentEnum.BOOK,
  //     uuid: '123456',
  //   });

  //   return attachment;
  // }

  // async createAttachment(file: CreateAttachmentDto) {
  //   const path = AttachmentDirectoryEnum[file.parentType].replace(
  //     '{uuid}',
  //     file.uuid,
  //   );

  //   const attachment = await this.prismaService.attachment.create({
  //     data: {
  //       contentType: file.contentType,
  //       key: `${uuid()}-${file.filename}`,
  //       ext: file.ext,
  //       path,
  //     },
  //   });

  //   //Pre-signing a 'putObject' (asynchronously)
  //   const params = {
  //     Key: `${path}/${attachment.key}.${attachment.ext}`,
  //     ContentType: attachment.contentType,
  //     Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
  //     Expires: process.env.AWS_EXPIRATION_TIME,
  //   };
  //   const signedUrl = this.s3.getSignedUrl('putObject', params);
  //   return plainToClass(AttachmentDto, { signedUrl, ...attachment });
  // }
}
