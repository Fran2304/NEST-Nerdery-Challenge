import {
  UseGuards,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AttachmentsService } from './attachments.service';
import { Express } from 'express';
import { Role } from '../common/enums/role.enum';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Attachment } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { ApiFile } from '../common/helpers/upload-swagger-decorator';

@ApiTags('Attachments')
@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Roles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Only MANAGER access' })
  @ApiBearerAuth('access_token')
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @UseInterceptors(FileInterceptor('file'))
  async createAttachment(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Attachment> {
    return await this.attachmentsService.createAttachment(
      file.buffer,
      file.originalname,
    );
  }

  // @Post()
  // @ApiConsumes('multipart/form-data')
  // @ApiFile('file')
  // @UseInterceptors(FileInterceptor('file'))
  // async createImage(@UploadedFile() file: Express.Multer.File) {
  //   return await this.attachmentsService.createImage(file);
  // }
}

// uuid: string;
// contentType: ContentTypeEnum;
// ext: FileExtensionEnum;
// parentType: ParentEnum;
// filename: string;
