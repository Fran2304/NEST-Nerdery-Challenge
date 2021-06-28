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
  Request,
} from '@nestjs/common';
import { Book } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { RolesGuard } from '../common/guards/roles.guard';
import { BooksService } from './books.service';
import { ActiveBookDto } from './dto/activeBooks.dto';
import { CreateBookDto } from './dto/createBook.dto';
import { DetailBookDto } from './dto/detailBook.dto';
import { LikeBookDto } from './dto/likeBookDto.dto';
import { UpdateBookDto } from './dto/updatebook.dto';

@Controller('book')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  // Create a book manager
  @Roles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createBook(@Body() createBook: CreateBookDto): Promise<Book> {
    console.log(createBook);
    return this.bookService.createBook(createBook);
  }

  // See actives products costumer
  @Get()
  getActiveBooks(@Query() paginationQuery) {
    return this.bookService.getActiveBooks(paginationQuery);
  }

  // See all products manager
  @Roles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/manager')
  getAllBooks(@Query() paginationQuery): Promise<ActiveBookDto[]> {
    return this.bookService.getBooks(paginationQuery);
  }

  // See active books details costumer
  @Get('/:idBook')
  getOneBook(@Param('idBook') id: number): Promise<DetailBookDto> {
    return this.bookService.getOneBook(id);
  }

  // Likes to books by costumer
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  updateLikes(
    @Param('id') bookId: number,
    @Request() req,
    @Body() dataLike: LikeBookDto,
  ): Promise<any> {
    // console.log(bookId, req.user.id, dataLike);
    return this.bookService.processLikes(bookId, req.user.id, dataLike);
  }

  //Updatae books manager
  @Roles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/update/:id')
  updateBook(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateBook(id, updateBookDto);
  }

  // Disable books manager
  @Roles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/disable/:id')
  disable(@Param('id') id: number, @Body() bookStateDto) {
    return this.bookService.disableBook(id, bookStateDto);
  }

  // Delete books manager
  @Roles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/delete/:id')
  deleteBook(@Param('id') id: number) {
    return this.bookService.deleteBook(id);
  }
}
