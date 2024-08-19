import { getCachedCommunityPost } from "@/actions/community/[id]";
import { updateCommunity } from "@/actions/community/edit";
import { getIsOwner } from "@/actions/gatherings";
import CommunityForm from "@/components/community/CommunityForm";
import { notFound } from "next/navigation";

export default async function EditCommunity({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const community = await getCachedCommunityPost(id);
  if (!community) {
    return notFound();
  }
  const isOwner = await getIsOwner(community.userId);
  if (!isOwner) {
    return notFound();
  }
  const interceptAction = async (_: any, formData: FormData) => {
    "use server";
    formData.append("id", String(id));
    return updateCommunity(_, formData);
  };
  return <CommunityForm action={interceptAction} initialState={community} />;
}
