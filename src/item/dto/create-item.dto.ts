import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsNumber()
  count: number;

  @IsNotEmpty()
  @IsNumber()
  bookId: number;
}