"use server";

import { db } from "@/lib/db";
import getSession from "@/lib/session";
import { CREATE_COMMENT_SCHEMA } from "@/schemas/community";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

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

async function getComments(postId: number) {
  const comments = await db.comment.findMany({
    where: {
      communityPostId: postId,
    },
    include: {
      user: {
        select: {
          id: true,
          avatar: true,
          username: true,
        },
      },
    },
  });
  return comments;
}

export async function uploadComment(_: any, formData: FormData) {
  const data = {
    payload: formData.get("payload"),
    postId: formData.get("postId"),
  };
  const session = await getSession();
  const result = CREATE_COMMENT_SCHEMA.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    await db.comment.create({
      data: {
        communityPostId: Number(result.data.postId),
        userId: Number(session.id),
        payload: result.data.payload,
      },
      select: {
        id: true,
      },
    });
    revalidatePath("/community");
    revalidateTag(`community-comments-${result.data.postId}`);
  }
}

export async function deleteComment(commentId: number) {
  const { communityPostId } = await db.comment.delete({
    where: {
      id: commentId,
    },
    select: {
      communityPostId: true,
    },
  });
  revalidatePath("/community");
  revalidateTag(`community-comments-${communityPostId}`);
}

export async function likeCommunityPost(postId: number) {
  try {
    const session = await getSession();
    await db.like.create({
      data: {
        communityPostId: postId,
        userId: session.id!,
      },
    });
    revalidatePath("/community");
    revalidateTag(`community-like-status-${postId}`);
  } catch (e) {}
}

export async function disLikeCommunityPost(postId: number) {
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
    revalidatePath("/community");
    revalidateTag(`community-like-status-${postId}`);
  } catch (e) {}
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
    revalidatePath("/community");
    return post;
  } catch (e) {
    return null;
  }
}

export async function getCommunityPostTitle(id: number) {
  const post = await db.communityPost.findUnique({
    where: {
      id,
    },
    select: {
      title: true,
    },
  });
  return { title: post?.title };
}

export async function deleteCommunityPost(id: number) {
  const communityPost = await db.communityPost.delete({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });
  revalidateTag(`community-post-${communityPost.id}`);
  revalidateTag(`community-like-status-${communityPost.id}`);
  revalidateTag(`community-comments-${communityPost.id}`);
  redirect("/community");
}

// 여기서부터 데이터 캐시 함수
export async function getCachedCommunityPost(postId: number) {
  const cachedOperation = unstable_cache(
    getCommunityPost,
    [`community-post-${postId}`],
    { tags: [`community-post-${postId}`] }
  );
  return cachedOperation(postId);
}

export async function getCachedCommunityPostTitle(postId: number) {
  const cachedOperation = unstable_cache(
    getCommunityPostTitle,
    [`community-post-title-${postId}`],
    { tags: [`community-post-${postId}`] }
  );
  return cachedOperation(postId);
}

export async function getCachedLikeStatus(postId: number) {
  const session = await getSession();
  const userId = session.id;
  const cachedOperation = unstable_cache(
    getLikeStatus,
    [`community-like-status-${postId}`],
    {
      tags: [`community-like-status-${postId}`],
    }
  );

  return cachedOperation(postId, userId!);
}

export async function getCachedComments(postId: number) {
  const cachedOperation = unstable_cache(
    getComments,
    [`community-comments-${postId}`],
    { tags: [`community-comments-${postId}`] }
  );
  return cachedOperation(postId);
}
