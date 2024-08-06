import {
  getCachedGatheringPost,
  getGathering,
  getIsOwner,
} from "@/actions/gatherings";
import { updateGathering } from "@/actions/gatherings/edit";
import GatheringForm from "@/components/gatherings/GatheringForm";
import { notFound } from "next/navigation";

export default async function EditGathering({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const gathering = await getCachedGatheringPost(id);
  if (!gathering) {
    return notFound();
  }
  const isOwner = await getIsOwner(gathering.userId);
  if (!isOwner) {
    return notFound();
  }
  return (
    <div>
      <GatheringForm
        id={params.id}
        action={updateGathering}
        initialState={gathering}
      />
    </div>
  );
}
