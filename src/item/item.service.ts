import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CardItem } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'common/services/prisma.service';
import { ArrayCardItemsDto } from './dto/array-card-items.dto';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemCardDto } from './dto/item-card.dto';

@Injectable()
export class ItemService {
  constructor(private readonly prismaService: PrismaService) {}
  async getBook(bookId) {
    const book = await this.prismaService.book.findUnique({
      where: { id: bookId },
    });

    const { id, description, urlImage, active, ...rest } = book;
    return rest;
  }

  async createCardItem(
    userId: number,
    body: CreateItemDto,
  ): Promise<ItemCardDto> {
    const { count, bookId } = body;
    const book = await this.getBook(bookId);
    // console.log('book', book.title);
    if (!book)
      throw new NotFoundException(
        `There's not an book with this Id: ${bookId}`,
      );
    if (book.quantity === 0) {
      throw new BadRequestException(`Stock sold out: ${book.title}`);
    }
    const cardItem = await this.prismaService.cardItem.create({
      data: {
        count,
        subtotal: +book.price * count,
        bookId,
        userId,
      },
    });

    const cardWithBook = { ...book, ...cardItem };
    return plainToClass(ItemCardDto, cardWithBook);
  }

  async getCardItemFromUser(userId: number): Promise<ArrayCardItemsDto[]> {
    const cardItems = await this.prismaService.cardItem.findMany({
      where: {
        AND: [
          {
            userId: userId,
          },
          { shoppingId: null },
        ],
      },
    });
    return plainToClass(ArrayCardItemsDto, cardItems);
  }

  updateCardItemWithShoppingId(
    cardItems: ArrayCardItemsDto[],
    shoppingId: number,
  ) {
    return cardItems.map(
      async (item) =>
        await this.prismaService.cardItem.update({
          data: { shoppingId },
          where: { id: item.id },
        }),
    );
  }
}
