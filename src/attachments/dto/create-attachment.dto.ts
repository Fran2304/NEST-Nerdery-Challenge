import {
  ContentTypeEnum,
  FileExtensionEnum,
  ParentEnum,
} from '../enums/attachement.enum';

export class CreateAttachmentDto {
  readonly uuid: string;
  readonly contentType: ContentTypeEnum;
  readonly ext: FileExtensionEnum;
  readonly parentType: ParentEnum;
  readonly filename: string;
}
