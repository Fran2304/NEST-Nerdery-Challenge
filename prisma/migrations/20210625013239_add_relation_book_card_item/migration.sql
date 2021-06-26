/*
  Warnings:

  - Added the required column `book_id` to the `CardItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CardItem" ADD COLUMN     "book_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CardItem" ADD FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
