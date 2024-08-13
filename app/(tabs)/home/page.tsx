import { getInitialGatherings } from "@/actions/gatherings";
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
      <Button
        asChild
        className="flex items-center justify-center rounded-full size-16 fixed bottom-24 right-3 transition-colors"
      >
        <Link href="/gatherings/add">
          <PlusIcon className="size-10 stroke-2" />
        </Link>
      </Button>
    </div>
  );
}
