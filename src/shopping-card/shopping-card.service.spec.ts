import { Test, TestingModule } from '@nestjs/testing';
import { Book, User } from '@prisma/client';
import { ItemService } from '../item/item.service';
import { CommonModule } from '../common/common.module';
import { PrismaService } from '../common/services/prisma.service';
import { ShoppingCardService } from './shopping-card.service';
import { BooksService } from '../books/books.service';
import { UsersService } from '../users/users.service';
import { AttachmentsService } from '../attachments/attachments.service';
import { ItemModule } from '../item/item.module';
import { AttachmentsModule } from '../attachments/attachments.module';
import { BooksModule } from '../books/books.module';

let service: ShoppingCardService;
let itemService: ItemService;
let prismaService: PrismaService;

let user: User;
let book: Book;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [CommonModule, ItemService, BooksModule, AttachmentsModule],
    providers: [
      ShoppingCardService,
      ItemService,
      BooksService,
      AttachmentsService,
      UsersService,
      PrismaService,
    ],
  }).compile();

  service = module.get<ShoppingCardService>(ShoppingCardService);
  prismaService = module.get<PrismaService>(PrismaService);

  user = await prismaService.user.findFirst({
    where: { email: 'welcome@test.com' },
  });

  book = await prismaService.book.findFirst({
    where: { title: 'One Hundred Years of Solitude' },
  });
});

describe('Create Purcharse', () => {
  it('Cart empty', async () => {
    await expect(
      service.createPurchase(user.id, {
        status: 'PAID',
      }),
    ).rejects.toThrow('Cart is empty');
  });

  it('Success create purcharse', async () => {
    // const cart = await itemService.createCardItem(user.id, {
    //   count: 1,
    //   bookId: book.id,
    // })
    // console.log('cart', cart)

    // const res = await service.createPurchase(user.id, {
    //   status: 'PAID',
    // });

    // expect(res).toHaveProperty('total');
    // expect(cart.id).not.toBeNull();
  });
});

describe.skip('Get Paid Purcharse', () => {
  it('Return paid purcharse', async () => {
    await service.createPurchase(user.id, {
      status: 'PENDING',
    });

    const res = await service.getProductsPurchase(user.id);
    expect(res).toHaveLength(1);
  });
});

afterAll(async () => {
  await prismaService.cardItem.deleteMany();
  await prismaService.shoppingCard.deleteMany();
});
