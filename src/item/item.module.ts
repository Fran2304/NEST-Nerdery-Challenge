import { Module } from '@nestjs/common';
import { AttachmentsService } from 'src/attachments/attachments.service';
import { BooksService } from '../books/books.service';
import { CommonModule } from '../common/common.module';
import { ItemService } from './item.service';

@Module({
  imports: [CommonModule],
  providers: [ItemService, BooksService, AttachmentsService]
})
export class ItemModule {}
