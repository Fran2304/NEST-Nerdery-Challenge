import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ExpressAdapter, FileInterceptor } from '@nestjs/platform-express';
import { Book } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { RolesGuard } from '../common/guards/roles.guard';
import { BooksService } from './books.service';
import { ActiveBookDto } from './dto/activeBooks.dto';
import { CreateBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/updatebook.dto';
import { Express } from 'express';

@Controller('book')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Roles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createBook(@Body() createBook: CreateBookDto): Promise<Book> {
    console.log(createBook);
    return this.bookService.createBook(createBook);
  }

  @Get()
  getActiveBooks(@Query() paginationQuery) {
    return this.bookService.getActiveBooks(paginationQuery);
  }

  @Roles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/manager')
  getAllBooks(@Query() paginationQuery): Promise<Book[]> {
    return this.bookService.getBooks(paginationQuery);
  }

  @Get('/:idBook')
  getOneBook(@Param('idBook') id: number) {
    return this.bookService.getOneBook(id);
  }

  @Roles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/update/:id')
  updateBook(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateBook(id, updateBookDto);
  }

  @Roles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/disable/:id')
  disable(@Param('id') id: number, @Body() bookStateDto) {
    return this.bookService.disableBook(id, bookStateDto);
  }

  @Roles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/delete/:id')
  deleteBook(@Param('id') id: number) {
    return this.bookService.deleteBook(id);
  }

  @Roles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post(':id/attachment')
  addUrlImage(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.bookService.addUrlImage(id, file.buffer, file.originalname);
  }
}
