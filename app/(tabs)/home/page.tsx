import { getInitialGatherings } from "@/actions/gatherings";
import FloatingAddButton from "@/components/common/FloatingAddButton";
import GatheringList from "@/components/gatherings/GatheringList";
export const metadata = {
  title: "홈",
};

export default async function Gatherings() {
  const initialGatherings = await getInitialGatherings();
  return (
    <div>
      <GatheringList initialGatherings={initialGatherings} />
      <FloatingAddButton href="/gatherings/add" />
    </div>
  );
}
