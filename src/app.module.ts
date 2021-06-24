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

@Module({
  imports: [UsersModule, AuthModule, CommonModule, AuthorModule],
  controllers: [AppController, AuthorController],
  providers: [AppService, PrismaService, UsersService, AuthorService],
})
export class AppModule {}
