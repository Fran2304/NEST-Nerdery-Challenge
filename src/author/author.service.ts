import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAuthors(): Promise<Author[]> {
    return await this.prismaService.author.findMany();
  }

  async getAuthor(idAuthor: string): Promise<Author> {
    const author = await this.prismaService.author.findUnique({
      where: { id: Number(idAuthor) },
    });
    if (!author) throw new NotFoundException(`Author not found  with ${idAuthor} id`);
    return author;
  }

  async createAuthor(createAuthor: CreateAuthorDto): Promise<Author> {
    return await this.prismaService.author.create({
      data: {
        fullName: createAuthor.fullName,
      },
    });
  }
}
