import { getIsOwner } from "@/actions/gatherings";
import { deleteGathering } from "@/actions/gatherings/[id]";
import { TrashIcon } from "@heroicons/react/24/solid";

interface IGatheringDeleteButtonProps {
  userId: number;
  gatheringId: number;
}

export default async function GatheringDeleteButton({
  userId,
  gatheringId,
}: IGatheringDeleteButtonProps) {
  const isOwner = await getIsOwner(userId);

  const handleDeleteGathering = async () => {
    "use server";
    await deleteGathering(gatheringId);
  };

  return (
    <form action={handleDeleteGathering} className="flex gap-3">
      <button className="bg-emerald-500 px-5 py-2.5 rounded-md font-semibold text-white">
        <TrashIcon className="h-[25px]" />
      </button>
    </form>
  );
}
