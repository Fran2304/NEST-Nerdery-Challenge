import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SengridService } from 'src/helpers/sengrid.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [UsersService, SengridService],
  exports: [UsersService, SengridService],
  controllers: [UsersController],
})
export class UsersModule {}
