/*
  Warnings:

  - Made the column `userId` on table `Comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `WatchHistory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "WatchHistory" ALTER COLUMN "userId" SET NOT NULL;
