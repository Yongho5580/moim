"use server";
import { db } from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { AWS_BUCKET, AWS_S3_BASE_URL } from "@/constants/config";
import { s3 } from "@/lib/s3Client";
import { ADD_GATHERING_SCHEMA } from "@/schemas/gatherings/add";
import { revalidatePath, revalidateTag } from "next/cache";

export async function uploadS3({ name, body }: { name: string; body: Buffer }) {
  try {
    const params = new PutObjectCommand({
      Bucket: AWS_BUCKET,
      Key: name,
      Body: body,
      ContentType: "image/jpg",
    });
    await s3.send(params);
  } catch (error) {
    console.log(error);
  }
}

export async function preparePhotoData(
  photo: File
): Promise<{ name: string; body: Buffer }> {
  const ext = photo.name.split(".").at(-1);
  const uid = uuidv4().replace(/-/g, "");
  const name = `${uid}${ext ? "." + ext : ""}`;
  const body = (await photo.arrayBuffer()) as Buffer;
  return {
    name,
    body,
  };
}

export async function uploadGathering(_: any, formData: FormData) {
  const file = formData.get("photo");
  let photoUrl = "";

  if (file instanceof File) {
    const { name, body } = await preparePhotoData(file);
    await uploadS3({ name, body });
    photoUrl = `${AWS_S3_BASE_URL}/${name}`;
    formData.set("photo", photoUrl);
  } else {
    return;
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
      revalidatePath("/home");
      revalidateTag(`gathering-post-${gathering.id}`);
      redirect(`/gatherings/post/${gathering.id}`);
    }
  }
}
