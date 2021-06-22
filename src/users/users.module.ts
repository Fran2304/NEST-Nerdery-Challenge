import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SengridService } from 'src/helpers/sengrid.service';
import { ConfigModule } from '@nestjs/config';
import sendgridConfig from 'src/config/sendgrid.config';

@Module({
  // imports: [ConfigModule.forFeature(sendgridConfig)],
  providers: [UsersService, SengridService],
  exports: [UsersService, SengridService],
  controllers: [UsersController],
})
export class UsersModule {}
