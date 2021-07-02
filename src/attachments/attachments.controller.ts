import {
  UseGuards,
  Controller,
  Post,
  Request,
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
import { ApiFile } from '../common/helpers/upload-swagger-decorator';

@ApiTags('Attachments')
@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Roles(Role.MANAGER)
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Only MANAGER access' })
  @ApiBearerAuth('access_token')
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @UseInterceptors(FileInterceptor('file'))
  async createImage(@Request() req) {
    return await this.attachmentsService.endpointToUpload(
      req.headers['content-type'],
    );
  }
}

// @Post()
// @ApiConsumes('multipart/form-data')
// @ApiFile('file')
// @UseInterceptors(FileInterceptor('file'))
// async createImage(@UploadedFile() file: Express.Multer.File) {
//   return await this.attachmentsService.createImage(file);
// }

// uuid: string;
// contentType: ContentTypeEnum;
// ext: FileExtensionEnum;
// parentType: ParentEnum;
// filename: string;
