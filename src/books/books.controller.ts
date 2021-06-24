import { Body, Controller, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/createBook.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}
  // @Post('book')
  // createBook(@Body() createProduct: CreateBookDto) {
  //   return this.bookService.createBook(createProduct);
  // }
}
