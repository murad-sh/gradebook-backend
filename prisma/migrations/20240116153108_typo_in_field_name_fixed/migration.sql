/*
  Warnings:

  - You are about to drop the column `loaction` on the `Lesson` table. All the data in the column will be lost.
  - Added the required column `location` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "loaction",
ADD COLUMN     "location" VARCHAR(255) NOT NULL;
