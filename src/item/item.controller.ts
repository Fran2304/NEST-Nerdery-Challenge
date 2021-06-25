import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createItemCard(@Request() req, @Body() createItemDto: CreateItemDto) {
    return this.itemService.createCardItem(req.user.id, createItemDto);
  }
}
