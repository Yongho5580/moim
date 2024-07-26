"use client";

import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { handleLoginForm } from "@/actions/login";
import { useFormState } from "react-dom";

export default function Login() {
  const [state, formAction] = useFormState(handleLoginForm, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">어서오세요!</h1>
        <h2 className="text-xl">함께 하는 즐거움, 모임</h2>
      </div>
      <form action={formAction} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="이메일"
          required
          errors={state?.errors ?? []}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          errors={state?.errors ?? []}
        />
        <FormButton text="로그인" />
      </form>
      <SocialLogin />
    </div>
  );
}
