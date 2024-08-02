"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import SocialLoginButtons from "@/components/common/SocialLoginButtons";
import { logIn } from "@/actions/login";
import { useFormState } from "react-dom";
import { PASSWORD_MIN_LENGTH } from "@/constants/validation";
import "@/lib/db";

export default function Login() {
  const [state, formAction] = useFormState(logIn, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">어서오세요!</h1>
        <h2 className="text-xl">함께 하는 즐거움, 모임</h2>
      </div>
      <form action={formAction} className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          placeholder="이메일"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          minLength={PASSWORD_MIN_LENGTH}
          required
          errors={state?.fieldErrors.password}
        />
        <Button text="로그인" />
      </form>
      <SocialLoginButtons />
    </div>
  );
}
