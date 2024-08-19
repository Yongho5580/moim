import { uploadCommunity } from "@/actions/community/add";
import CommunityForm from "@/components/community/CommunityForm";

export default function AddCommunity() {
  return <CommunityForm action={uploadCommunity} />;
}
