import { getGathering, getIsOwner } from "@/actions/gatherings";
import { updateGathering } from "@/actions/gatherings/edit";
import GatheringForm from "@/components/gatherings/GatheringForm";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

const getCachedGathering = unstable_cache(getGathering, ["gathering-post"], {
  tags: ["gathering-post"],
});

export default async function EditGathering({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const gathering = await getCachedGathering(id);
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
