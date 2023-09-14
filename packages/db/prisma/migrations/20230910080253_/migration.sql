/*
  Warnings:

  - You are about to drop the column `slug` on the `Topic` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Unit` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Topic_slug_key";

-- DropIndex
DROP INDEX "Unit_slug_key";

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "slug";
