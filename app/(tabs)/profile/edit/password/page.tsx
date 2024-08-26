import { EditPasswordForm } from "@/components/profile/EditPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "비밀번호 변경",
};

export default function EditPassword() {
  return <EditPasswordForm />;
}
