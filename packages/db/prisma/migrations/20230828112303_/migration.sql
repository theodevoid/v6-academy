-- CreateEnum
CREATE TYPE "TopicType" AS ENUM ('VIDEO', 'TEXT');

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "type" "TopicType" NOT NULL DEFAULT 'VIDEO';
