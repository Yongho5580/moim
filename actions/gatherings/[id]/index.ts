"use server";

import { AWS_BUCKET } from "@/constants/config";
import { db } from "@/lib/db";
import { s3 } from "@/lib/s3Client";
import { isPastEndDate } from "@/lib/utils";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

export async function getIsOwner(userId: number, sessionId: number) {
  if (sessionId) {
    return sessionId === userId;
  }
  return false;
}

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
  revalidateTag(`gathering-post-${gathering.id}`);
  revalidatePath("/home");
}

export async function getGatheringPost(gatheringId: number) {
  const gathering = await db.gatheringPost.findUnique({
    where: {
      id: gatheringId,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
      participants: {
        include: {
          user: {
            select: {
              username: true,
              avatar: true,
            },
          },
        },
      },
    },
  });
  const endDate = isPastEndDate(gathering?.endDate!);
  if (endDate) {
    await db.gatheringPost.update({
      where: {
        id: gatheringId,
      },
      data: {
        status: "closed",
      },
    });
  }
  return gathering;
}

export async function getGatheringPostTitle(gatheringId: number) {
  const gathering = await db.gatheringPost.findUnique({
    where: {
      id: gatheringId,
    },
    select: {
      title: true,
    },
  });
  return gathering;
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

export async function getCachedGatheringPost(postId: number) {
  const getCachedGathering = unstable_cache(
    getGatheringPost,
    [`gathering-post-${postId}`],
    {
      tags: [`gathering-post-${postId}`],
    }
  );

  return getCachedGathering(postId);
}

export async function getCachedGatheringTitle(postId: number) {
  const getCachedGathering = unstable_cache(
    getGatheringPostTitle,
    [`gathering-post-title-${postId}`],
    {
      tags: [`gathering-post-${postId}`],
    }
  );

  return getCachedGathering(postId);
}
