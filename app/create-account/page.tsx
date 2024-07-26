"use client";

import { createAccount } from "@/actions/create-account";
import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";

export default function CreateAccount() {
  const [state, formAction] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">회원 가입</h1>
        <h2 className="text-xl">모임에 참여하기 위한 과정이에요!</h2>
      </div>
      <form action={formAction} className="flex flex-col gap-3">
        <FormInput name="username" type="text" placeholder="이름" required />
        <FormInput name="email" type="email" placeholder="이메일" required />
        <FormInput
          name="password"
          type="password"
          placeholder="비밀번호"
          required
        />
        <FormInput
          name="confirm_password"
          type="password"
          placeholder="비밀번호 확인"
          required
        />
        <FormButton text="회원 가입" />
      </form>
      <SocialLogin />
    </div>
  );
}
