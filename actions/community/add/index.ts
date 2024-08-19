import { db } from "@/lib/db";
import getSession from "@/lib/session";
import { CREATE_COMMUNITY_SCHEMA } from "@/schemas/community";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function uploadCommunity(_: any, formData: FormData) {
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
  };
  const result = CREATE_COMMUNITY_SCHEMA.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    const communityPost = await db.communityPost.create({
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
    redirect(`/community/${communityPost.id}`);
  }
}
