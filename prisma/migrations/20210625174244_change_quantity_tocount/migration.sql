/*
  Warnings:

  - You are about to drop the column `quantity` on the `CardItem` table. All the data in the column will be lost.
  - Added the required column `count` to the `CardItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CardItem" DROP COLUMN "quantity",
ADD COLUMN     "count" INTEGER NOT NULL;
