import {
  getCachedCommunityPost,
  getCachedLikeStatus,
  getCommunityPost,
  getCommunityPosts,
} from "@/actions/community";
import { notFound } from "next/navigation";
import Comments from "@/components/community/[id]/Comments";
import UserInfo from "@/components/community/[id]/UserInfo";
import PostContent from "@/components/community/[id]/PostContent";
import PostStats from "@/components/community/[id]/PostStats";
import getSession from "@/lib/session";

export default async function CommunityPost({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const post = await getCachedCommunityPost(id);
  if (!post) {
    return notFound();
  }
  const { isLiked, likeCount } = await getCachedLikeStatus(id);

  return (
    <div className="p-5 flex flex-col text-white">
      <UserInfo
        avatar={post.user.avatar!}
        username={post.user.username}
        createdAt={post.created_at}
      />
      <PostContent title={post.title} description={post.description} />
      <PostStats
        isLiked={isLiked}
        likeCount={likeCount}
        postId={id}
        views={post.views}
      />
      <Comments postId={id} sessionId={Number(2)} comments={post.comments} />
    </div>
  );
}
