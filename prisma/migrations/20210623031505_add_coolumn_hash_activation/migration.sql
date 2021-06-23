/*
  Warnings:

  - Added the required column `hashActivation` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hashActivation" VARCHAR(255) NOT NULL;
