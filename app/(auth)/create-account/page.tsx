import { CreateAccountForm } from "@/components/create-account/CreateAccountForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원 가입",
};

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">회원 가입</h1>
        <h2 className="text-xl">모임에 참여하기 위한 과정이에요!</h2>
      </div>
      <CreateAccountForm />
    </div>
  );
}
