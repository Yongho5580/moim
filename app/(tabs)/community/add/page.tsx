import { uploadCommunity } from "@/actions/community";
import CommunityForm from "@/components/community/CommunityForm";

export default function AddCommunity() {
  return <CommunityForm action={uploadCommunity} />;
}
