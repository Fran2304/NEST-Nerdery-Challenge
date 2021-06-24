import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { SengridService } from './services/sengrid.service';

@Module({
  providers: [PrismaService, SengridService],
  exports: [PrismaService, SengridService]
})
export class CommonModule {}
