import { getCommunityPosts } from "@/actions/community";
import FloatingAddButton from "@/components/common/FloatingAddButton";
import CommunityItem from "@/components/community/CommunityItem";

export const metadata = {
  title: "커뮤니티",
};

export default async function Community() {
  const posts = await getCommunityPosts();

  return (
    <div className="px-side">
      {posts?.map((post) => (
        <CommunityItem key={post.id} {...post} />
      ))}
      <FloatingAddButton href="/community/add" />
    </div>
  );
}
