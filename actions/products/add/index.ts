"use server";
import { z } from "zod";
import { db } from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  AWS_ACCESS_KEY_ID,
  AWS_BUCKET,
  AWS_REGION,
  AWS_S3_BASE_URL,
  AWS_SECRET_ACCESS_KEY,
} from "@/constants/config";
import { s3 } from "@/lib/s3Client";

const schema = z.object({
  title: z.string({
    required_error: "제목을 작성해주세요.",
  }),
  description: z.string({
    required_error: "설명을 작성해주세요.",
  }),
  price: z.coerce.number({
    required_error: "모임비를 작성해주세요.",
  }),
  location: z.string({
    required_error: "모임 장소를 작성해주세요.",
  }),
  photo: z.string({
    required_error: "사진을 한 장 이상 첨부해주세요.",
  }),
});

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

export async function uploadProduct(_: any, formData: FormData) {
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
  };
  const result = schema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const product = await db.product.create({
        data: {
          title: result.data.title,
          description: result.data.description,
          price: result.data.price,
          photo: photoUrl,
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
      redirect(`/products/${product.id}`);
    }
  }
}
