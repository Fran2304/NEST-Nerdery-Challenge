/*
  Warnings:

  - You are about to drop the column `user_id` on the `Token` table. All the data in the column will be lost.
  - Added the required column `email` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_user_id_fkey";

-- DropIndex
DROP INDEX "Token_user_id_unique";

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "user_id",
ADD COLUMN     "email" TEXT NOT NULL;
