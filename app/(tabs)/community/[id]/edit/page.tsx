import { getCachedCommunityPost } from "@/actions/community/[id]";
import { updateCommunity } from "@/actions/community/edit";
import { getIsOwner } from "@/actions/gatherings";
import CommunityForm from "@/components/community/CommunityForm";
import getSession from "@/lib/session";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "커뮤니티 수정",
};

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
  const session = await getSession();
  const isOwner = await getIsOwner(community.userId, session.id);
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
