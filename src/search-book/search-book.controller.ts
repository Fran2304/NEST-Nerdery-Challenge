import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ActiveBookDto } from '../books/dto/activeBooks.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SearchBookService } from './search-book.service';

@Controller('search-book')
export class SearchBookController {
  constructor(private readonly searchBookService: SearchBookService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  searchByCategory(@Query() search): Promise<ActiveBookDto[]> {
    return this.searchBookService.searchingByCategory(search);
  }
}
