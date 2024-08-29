"use server";
import { db } from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { ADD_GATHERING_SCHEMA } from "@/schemas/gatherings/add";
import { revalidatePath, revalidateTag } from "next/cache";
import { preparePhotoData, uploadS3 } from "@/lib/utils";
import { AWS_S3_BASE_URL } from "@/constants/config";

export async function uploadGathering(_: any, formData: FormData) {
  const file = formData.get("photo");
  let photoUrl = "";

  if (
    file instanceof File &&
    file.size !== 0 &&
    file.name !== "undefined" &&
    file.type.startsWith("image/")
  ) {
    const { name, body } = await preparePhotoData(file);
    const type = file.type;
    await uploadS3({ name, body, type });
    photoUrl = `${AWS_S3_BASE_URL}/${name}`;
    formData.set("photo", photoUrl);
  } else {
    formData.set("photo", "");
  }
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    location: formData.get("location"),
    description: formData.get("description"),
    maxParticipants: formData.get("maxParticipants"),
    endDate: formData.get("endDate"),
  };
  const result = ADD_GATHERING_SCHEMA.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const gathering = await db.gatheringPost.create({
        data: {
          title: result.data.title,
          description: result.data.description,
          location: result.data.location,
          price: result.data.price,
          photo: photoUrl,
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
      await db.participant.create({
        data: {
          userId: session.id,
          gatheringPostId: gathering.id,
        },
      });
      revalidatePath("/home");
      revalidateTag(`gathering-post-${gathering.id}`);
      redirect(`/gatherings/post/${gathering.id}`);
    }
  }
}
