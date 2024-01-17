/*
  Warnings:

  - Added the required column `loaction` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "loaction" VARCHAR(255) NOT NULL;
