import { Test, TestingModule } from '@nestjs/testing';
import { User, Book } from '@prisma/client';
import { CommonModule } from '../common/common.module';
import { PrismaService } from '../common/services/prisma.service';
import { ItemService } from './item.service';

let service: ItemService;
let prismaService: PrismaService;
let user: User;
let book: Book;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [CommonModule],
    providers: [ItemService],
  }).compile();

  service = module.get<ItemService>(ItemService);
  prismaService = module.get<PrismaService>(PrismaService);
});

async () => {
  user = await prismaService.user.findFirst({
    where: { email: 'welcome@test.com' },
  });

  book = await prismaService.book.findFirst({
    where: { title: 'One Hundred Years of Solitude' },
  });
}

describe('Add book to cart', async () => {

  it.only('book add to cart', async () => {
    const res = await service.createCardItem(user.id, {
      count: 2,
      bookId: book.id,
    });
    expect(res).toHaveProperty('subtotal');
  });

  it('the count of book is more than quantity in stock', async () => {
    await expect(
      service.createCardItem(user.id, {
        count: 10,
        bookId: book.id,
      }),
    ).rejects.toThrow(`The amount ${book.quantity} was exceeded`);
  });

  it('get detail of cart', async () => {
    const res = await service.getCardItemFromUser(user.id)
    expect(res[0].subtotal).toEqual(39)
  });

  it('get error', async () => {
    const res = await service.getCardItemFromUser(123)
    console.log('res', res)
    //expect(res[0].subtotal).toEqual(39)
  });
});

afterAll(async () => {
  await prismaService.cardItem.deleteMany();
});
