-- CreateEnum
CREATE TYPE "TypeToken" AS ENUM ('EMAIL', 'API');

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "type" "TypeToken" NOT NULL DEFAULT E'EMAIL',
    "user_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_user_id_unique" ON "Token"("user_id");

-- AddForeignKey
ALTER TABLE "Token" ADD FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
