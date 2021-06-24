import { IsInt, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @IsOptional()
  page?: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @IsOptional()
  perPage?: number;
}
