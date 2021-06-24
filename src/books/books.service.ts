import { Injectable } from '@nestjs/common';
import { PrismaService } from 'common/services/prisma.service';
import { BookDto } from './dto/book.dto';

import { CreateBookDto } from './dto/createBook.dto';

@Injectable()
export class BooksService {
  constructor(private prismaService: PrismaService) {}

  // async createBook(createBookDto: CreateBookDto): Promise<any> {
  //   return this.prismaService.book.create({
  //     data: {
  //       title: createBookDto.title,
  //       description: createBookDto.description,
  //       yearPublished: createBookDto.yearPublished,
  //       price: createBookDto.price,
  //       urlImage: createBookDto.urlImage,
  //       quantity: createBookDto.quantity,
  //       categories:createBookDto.category
  //       author: createBookDto.author,
  //     },
  //   });
  // }
}
