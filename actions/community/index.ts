"use server";

import { db } from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag, unstable_cache } from "next/cache";

export async function getCommunityPosts() {
  try {
    const posts = await db.communityPost.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        views: true,
        created_at: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
    return posts;
  } catch (e) {
    return null;
  }
}

export async function getCommunityPost(id: number) {
  try {
    const post = await db.communityPost.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
    return post;
  } catch (e) {
    return null;
  }
}

async function getLikeStatus(postId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        communityPostId: postId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      communityPostId: postId,
    },
  });
  return { likeCount, isLiked: Boolean(isLiked) };
}

export async function likeCommunityPost(postId: number) {
  console.log(postId);
  try {
    const session = await getSession();
    await db.like.create({
      data: {
        communityPostId: postId,
        userId: session.id!,
      },
    });
    revalidateTag(`community-like-status-${postId}`);
  } catch (e) {}
}

export async function disLikeCommunityPost(postId: number) {
  console.log(postId);
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          communityPostId: postId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`community-like-status-${postId}`);
  } catch (e) {}
}

export async function getCachedCommunityPost(postId: number) {
  const cachedOperation = unstable_cache(getCommunityPost, ["community-post"]);
  return cachedOperation(postId);
}

export async function getCachedLikeStatus(postId: number) {
  const session = await getSession();
  const userId = session.id;
  const cachedOperation = unstable_cache(
    getLikeStatus,
    ["community-like-status"],
    {
      tags: [`community-like-status-${postId}`],
    }
  );

  return cachedOperation(postId, userId!);
}
