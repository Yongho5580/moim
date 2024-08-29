"use server";

import { db } from "@/lib/db";
import { preparePhotoData } from "@/lib/utils";
import { AWS_S3_BASE_URL } from "@/constants/config";
import { ADD_GATHERING_SCHEMA } from "@/schemas/gatherings/add";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { getGathering } from "..";
import { revalidatePath, revalidateTag } from "next/cache";
import { uploadS3 } from "../add";

export async function updateGathering(_: any, formData: FormData) {
  const file = formData.get("photo");
  const id = formData.get("id");
  let photoUrl = "";
  if (!id) return;
  if (
    file instanceof File &&
    file.size !== 0 &&
    file.name !== "undefined" &&
    file.type.startsWith("image/")
  ) {
    // const { name, body } = await preparePhotoData(file);
    // const type = file.type;
    // await uploadS3({ name, body, type });
    // photoUrl = `${AWS_S3_BASE_URL}/${name}`;
    formData.set("photo", photoUrl);
  } else {
    const gathering = await getGathering(+id);
    if (!gathering) {
      formData.set("photo", "");
    } else {
      formData.set("photo", gathering.photo);
    }
  }
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    location: formData.get("location"),
    photo: formData.get("photo"),
    price: formData.get("price"),
    endDate: formData.get("endDate"),
    maxParticipants: formData.get("maxParticipants"),
  };
  const result = ADD_GATHERING_SCHEMA.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten());
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
          maxParticipants: result.data.maxParticipants,
          endDate: result.data.endDate,
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
      revalidateTag(`gathering-post-${gathering.id}`);
      redirect(`/gatherings/post/${gathering.id}`);
    }
  }
}
