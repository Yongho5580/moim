-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_gatheringPostId_fkey";

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_gatheringPostId_fkey" FOREIGN KEY ("gatheringPostId") REFERENCES "GatheringPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
