import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { CommonModule } from '../common/common.module';
import { generateHash } from '../common/helpers/generator-hash.helper';
import { PrismaService } from '../common/services/prisma.service';
import { InputInfoUserDto } from './dto/input-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { AppModule } from 'app.module';

let service: UsersService;
let prismaService: PrismaService;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [CommonModule],
    providers: [UsersService],
    controllers: [UsersController],
  }).compile();

  service = module.get<UsersService>(UsersService);
  prismaService = module.get<PrismaService>(PrismaService);
});

const confirmationCode = generateHash();

describe('Create User', () => {
  it('should return a user created', async () => {
    const res = await service.createUser(
      plainToClass(InputInfoUserDto, {
        username: 'test',
        email: 'test@test.com',
        password: 'Password123',
      }),
      confirmationCode,
    );
    expect(res).toHaveProperty('id');
    expect(res.username).toEqual('test');
    expect(res.email).toEqual('test@test.com');
  });
  it('should return password is required', async () => {
    await expect(
      service.createUser(
        { username: 'test', email: 'test@test.com', password: '' },
        confirmationCode,
      ),
    ).rejects.toThrow(`Password can't be empty`);
  });
  it('should return email wrong', async () => {
    await expect(
      service.createUser(
        plainToClass(InputInfoUserDto, {
          username: '',
          email: '',
          password: '',
        }),
        '',
      ),
    ).rejects.toThrow(`Password can't be empty`);
  });
});

afterAll(async () => {
  await prismaService.user.deleteMany();
});
