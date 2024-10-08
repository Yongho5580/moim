"use server";

import { db } from "@/lib/db";
import getSession from "@/lib/session";
import { CREATE_COMMUNITY_SCHEMA } from "@/schemas/community";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function updateCommunity(_: any, formData: FormData) {
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    id: formData.get("id"),
  };
  const result = CREATE_COMMUNITY_SCHEMA.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    const communityPost = await db.communityPost.update({
      where: {
        id: Number(result.data.id),
      },
      data: {
        title: result.data.title,
        description: result.data.description,
        userId: session.id,
      },
      select: {
        id: true,
      },
    });

    revalidatePath("/community");
    revalidateTag(`community-post-${communityPost.id}`);
    redirect(`/community/${communityPost.id}`);
  }
}
