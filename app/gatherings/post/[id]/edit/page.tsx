import { getCachedGatheringPost, getIsOwner } from "@/actions/gatherings/[id]";
import { updateGathering } from "@/actions/gatherings/edit";
import GatheringForm from "@/components/gatherings/GatheringForm";
import getSession from "@/lib/session";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "모임 수정",
};

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
  const session = await getSession();
  const isOwner = await getIsOwner(gathering.userId, session.id);
  if (!isOwner) {
    return notFound();
  }
  return (
    <GatheringForm
      id={params.id}
      action={updateGathering}
      initialState={gathering}
      isEdit
    />
  );
}
