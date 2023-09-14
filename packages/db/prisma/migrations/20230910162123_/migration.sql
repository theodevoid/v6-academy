-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "fiatPrice" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mainLearningPoints" TEXT[],
ADD COLUMN     "pointsPrice" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "prerequisiteNotes" TEXT NOT NULL DEFAULT '';
