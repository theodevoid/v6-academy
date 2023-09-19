-- AlterTable
ALTER TABLE "User" ADD COLUMN     "githubId" TEXT,
ALTER COLUMN "password" DROP NOT NULL;
