import { notFound } from "next/navigation";
import Comments from "@/components/community/[id]/Comments";
import UserInfo from "@/components/community/[id]/UserInfo";
import PostContent from "@/components/community/[id]/PostContent";
import PostStats from "@/components/community/[id]/PostStats";
import getSession from "@/lib/session";
import {
  getCachedComments,
  getCachedCommunityPost,
  getCachedLikeStatus,
} from "@/actions/community/[id]";

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
  const session = await getSession();

  const { isLiked, likeCount } = await getCachedLikeStatus(id);
  const comments = await getCachedComments(id);

  return (
    <div className="p-5 flex flex-col gap-x-40">
      <UserInfo
        userId={post.userId}
        sessionId={session.id}
        postId={id}
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
      <Comments postId={id} sessionId={session.id} comments={comments} />
    </div>
  );
}
