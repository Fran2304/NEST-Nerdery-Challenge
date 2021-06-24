/* eslint-disable prettier/prettier */
import {
  IsBoolean,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
export class BookDto {
  readonly title: string;

  readonly description: string;

  readonly yearPublished?: number;

  readonly quantity: number;

  readonly price: number;

  readonly urlImage: string;

  readonly active: boolean;

  readonly author: string;
  readonly categories: string[];
}
