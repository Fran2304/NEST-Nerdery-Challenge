/*
  Warnings:

  - You are about to alter the column `price` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `DoublePrecision`.
  - You are about to alter the column `subtotal` on the `CardItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "CardItem" ALTER COLUMN "subtotal" SET DATA TYPE DOUBLE PRECISION;
