import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { CommonModule } from './common/common.module';

@Module({
  imports: [UsersModule, AuthModule, CommonModule],
  controllers: [AppController],
  providers: [AppService, UsersService],
  exports: [CommonModule]
})
export class AppModule {}
