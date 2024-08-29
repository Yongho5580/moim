"use server";
import { db } from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { AWS_BUCKET, AWS_S3_BASE_URL } from "@/constants/config";
import { s3 } from "@/lib/s3Client";
import { ADD_GATHERING_SCHEMA } from "@/schemas/gatherings/add";
import { revalidatePath, revalidateTag } from "next/cache";

export async function uploadS3({
  name,
  body,
  type,
}: {
  name: string;
  body: Buffer;
  type: string;
}) {
  try {
    const params = new PutObjectCommand({
      Bucket: AWS_BUCKET,
      Key: name,
      Body: body,
      ContentType: type,
    });
    await s3.send(params);
  } catch (error) {
    console.log(error);
  }
}

async function s3Upload(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/upload",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: file.name, contentType: file.type }),
    }
  );

  if (response.ok) {
    const { url, fields } = await response.json();

    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formData.append("file", file);

    const uploadResponse = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (uploadResponse.ok) {
      const key = formData.get("key");
      return key;
    } else {
      console.log("S3 업로드에 실패했습니다.", uploadResponse);
    }
  }
}

export async function uploadGathering(_: any, formData: FormData) {
  const file = formData.get("photo");
  let photoUrl = "";

  if (
    file instanceof File &&
    file.size !== 0 &&
    file.name !== "undefined" &&
    file.type.startsWith("image/")
  ) {
    const key = await s3Upload(file);
    photoUrl = `${AWS_S3_BASE_URL}/${key}`;
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
