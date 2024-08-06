"use server";

import { db } from "@/lib/db";
import { preparePhotoData, uploadS3 } from "../add";
import { AWS_S3_BASE_URL } from "@/constants/config";
import { ADD_GATHERING_SCHEMA } from "@/schemas/gatherings/add";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { getGathering } from "..";
import { revalidatePath, revalidateTag } from "next/cache";

export async function updateGathering(_: any, formData: FormData) {
  const file = formData.get("photo");
  const id = formData.get("id");
  let photoUrl = "";
  if (!id) return;
  if (file instanceof File && file.type !== "application/octet-stream") {
    const { name, body } = await preparePhotoData(file);
    await uploadS3({ name, body });
    photoUrl = `${AWS_S3_BASE_URL}/${name}`;
    formData.set("photo", photoUrl);
  } else {
    const gathering = await getGathering(+id);
    if (!gathering) return;
    formData.set("photo", gathering.photo);
  }
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    location: formData.get("location"),
    photo: formData.get("photo"),
    price: formData.get("price"),
  };
  const result = ADD_GATHERING_SCHEMA.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const gathering = await db.gatheringPost.update({
        where: {
          id: +id,
        },
        data: {
          title: result.data.title,
          description: result.data.description,
          location: result.data.location,
          price: result.data.price,
          photo: result.data.photo,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      revalidatePath("/home");
      revalidateTag("gathering-post");
      redirect(`/gatherings/post/${gathering.id}`);
    }
  }
}
