import { getInitialGatherings } from "@/actions/gatherings";
import GatheringList from "@/components/gatherings/GatheringList";
import { PlusIcon } from "@heroicons/react/24/solid";
import { unstable_cache } from "next/cache";
import Link from "next/link";

export const metadata = {
  title: "홈",
};

export default async function Gatherings() {
  const initialGatherings = await getInitialGatherings();
  return (
    <div>
      <GatheringList initialGatherings={initialGatherings} />
      <Link
        href="/gatherings/add"
        className="bg-emerald-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-emerald-600"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
