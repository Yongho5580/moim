"use server";

import { db } from "@/lib/db";

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
      orderBy: {
        created_at: "desc",
      },
    });
    return posts;
  } catch (e) {
    return null;
  }
}
