import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { PrismaService } from '../common/services/prisma.service';
import { CommonModule } from '../common/common.module';
import { CategoryService } from 'category/category.service';

@Module({
  imports: [CommonModule],
  controllers: [BooksController],
  providers: [BooksService, PrismaService, CategoryService],
})
export class BooksModule {}
