/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';
import {
  IsDecimal,
  isDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNumber()
  readonly yearPublished?: number;

  @IsNumber()
  @IsDecimal()
  readonly price: number;

  @IsNotEmpty()
  @IsNotEmpty()
  readonly urlImage: string;

  readonly quantity: number;

  readonly author: string;
  readonly category: string[];
}
