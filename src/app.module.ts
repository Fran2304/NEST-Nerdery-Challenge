import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './common/services/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { CommonModule } from './common/common.module';
import { AuthorService } from './author/author.service';
import { AuthorController } from './author/author.controller';
import { AuthorModule } from './author/author.module';
import { CategoryModule } from './category/category.module';
import { BooksModule } from 'books/books.module';
import { BooksService } from 'books/books.service';
import { CategoryController } from 'category/category.controller';
import { BooksController } from 'books/books.controller';
import { CategoryService } from 'category/category.service';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    CommonModule,
    AuthorModule,
    CategoryModule,
    BooksModule,
  ],
  controllers: [
    AppController,
    AuthorController,
    CategoryController,
    BooksController,
  ],
  providers: [
    AppService,
    PrismaService,
    UsersService,
    AuthorService,
    BooksService,
    CategoryService,
  ],
})
export class AppModule {}
