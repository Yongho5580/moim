import { getInitialGatherings } from "@/actions/gatherings";
import FloatingAddButton from "@/components/common/FloatingAddButton";
import GatheringList from "@/components/gatherings/GatheringList";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

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
