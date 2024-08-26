import { getInitialGatherings } from "@/actions/gatherings";
import FloatingAddButton from "@/components/common/FloatingAddButton";
import GatheringList from "@/components/gatherings/GatheringList";
import { Metadata } from "next";

export default async function Gatherings() {
  const initialGatherings = await getInitialGatherings();
  return (
    <div>
      <GatheringList initialGatherings={initialGatherings} />
      <FloatingAddButton href="/gatherings/add" />
    </div>
  );
}
