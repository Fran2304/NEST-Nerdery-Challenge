import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { Author } from '@prisma/client';
import { paginatedHelper } from 'common/helpers/paginated.helper';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAuthors(@Query() paginationQuery): Promise<Author[]> {
    return this.authorService.getAuthors(paginationQuery);
  }

  @Get('/:idAuthor')
  getAuthor(@Param('idAuthor') idAuthor: string): Promise<Author> {
    return this.authorService.getAuthor(idAuthor);
  }

  @Roles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createAuthor(@Body() body: CreateAuthorDto): Promise<Author> {
    return this.authorService.createAuthor(body);
  }
}
