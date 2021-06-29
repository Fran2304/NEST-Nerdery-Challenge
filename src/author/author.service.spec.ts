import { Test, TestingModule } from '@nestjs/testing';
import { CommonModule } from '../common/common.module';
import { PrismaService } from '../common/services/prisma.service';
import { AuthorService } from './author.service';

let service: AuthorService;
let prismaService: PrismaService;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [CommonModule],
    providers: [AuthorService],
  }).compile();

  service = module.get<AuthorService>(AuthorService);
  prismaService = module.get<PrismaService>(PrismaService);
});

describe('Create author', () => {
  it('should return a new author', async () => {
    const res = await service.createAuthor({
      fullName: 'Isabel Allende',
    });
    expect(res).toHaveProperty('id');
    expect(res.fullName).toEqual('Isabel Allende');
  });
  it(`return author, upsert method, if it's repeat the full name`, async () => {
    const res = await service.createAuthor({
      fullName: 'Isabel Allende',
    });
    expect(res).toHaveProperty('id');
    expect(res.fullName).toEqual('Isabel Allende');
  });
});

describe.skip('Get author', () => {
  it('should return an author', async () => {
    const res = await service.createAuthor({
      fullName: 'Isabel Allende',
    });
    expect(res).toHaveProperty('id');
    expect(res.fullName).toEqual('Isabel Allende');
  });
  it(`return author, upsert method, if it's repeat the full name`, async () => {
    const res = await service.createAuthor({
      fullName: 'Isabel Allende',
    });
    expect(res).toHaveProperty('id');
    expect(res.fullName).toEqual('Isabel Allende');
  });
});

afterAll(async () => {
  await prismaService.author.deleteMany();
});
