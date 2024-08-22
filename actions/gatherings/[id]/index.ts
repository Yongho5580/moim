"use server";

import { AWS_BUCKET } from "@/constants/config";
import { db } from "@/lib/db";
import { s3 } from "@/lib/s3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteGathering(id: number) {
  const gathering = await db.gatheringPost.delete({
    where: {
      id,
    },
    select: {
      id: true,
      photo: true,
    },
  });
  const photoKey = gathering.photo.split("/").pop();
  await s3.send(
    new DeleteObjectCommand({
      Bucket: AWS_BUCKET,
      Key: photoKey,
    })
  );
  revalidatePath("/home");
  revalidateTag(`gathering-post-${gathering.id}`);
  redirect("/profile");
}

export async function createParticipant(
  userId: number,
  gatheringPostId: number
) {
  const participantExist = await db.participant.findUnique({
    where: {
      id: {
        userId,
        gatheringPostId,
      },
    },
  });
  if (participantExist) {
    return redirect("/profile");
  }
  await db.participant.create({
    data: {
      userId,
      gatheringPostId,
    },
  });

  revalidatePath("/profile");
  redirect("/profile");
}
