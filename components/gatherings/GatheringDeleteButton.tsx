import { deleteGathering } from "@/actions/gatherings/[id]";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "../ui/button";

interface IGatheringDeleteButtonProps {
  userId: number;
  gatheringId: number;
}

export default async function GatheringDeleteButton({
  userId,
  gatheringId,
}: IGatheringDeleteButtonProps) {
  const handleDeleteGathering = async () => {
    "use server";
    await deleteGathering(gatheringId);
  };

  return (
    <form action={handleDeleteGathering} className="flex gap-3">
      <Button>
        <TrashIcon className="h-[25px]" />
      </Button>
    </form>
  );
}
