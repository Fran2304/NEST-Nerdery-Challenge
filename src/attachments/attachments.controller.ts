import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AttachmentsService } from './attachments.service';
import { Express } from 'express';

@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createAttachment(@UploadedFile() file: Express.Multer.File) {
    return await this.attachmentsService.createAttachment(
      file.buffer,
      file.originalname,
    );
  }
}
