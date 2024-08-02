"use server";

import {
  AWS_ACCESS_KEY_ID,
  AWS_BUCKET,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
} from "@/constants/config";
import { db } from "@/lib/db";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { redirect } from "next/navigation";

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID as string,
    secretAccessKey: AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function onDeleteProduct(id: number) {
  const product = await db.product.delete({
    where: {
      id,
    },
    select: {
      photo: true,
    },
  });
  const photoKey = product.photo.split("/").pop();
  await s3.send(
    new DeleteObjectCommand({
      Bucket: AWS_BUCKET,
      Key: photoKey,
    })
  );
  redirect("/products");
}
