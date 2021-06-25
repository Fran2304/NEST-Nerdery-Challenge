import { Exclude } from 'class-transformer';

export class ArrayCardItemsDto {
  id: number;
  count: number;
  subtotal: number;
  @Exclude()
  dateCreated: Date;
  @Exclude()
  userId: number;
  bookId: number;
  @Exclude()
  shoppingId: number;
}
