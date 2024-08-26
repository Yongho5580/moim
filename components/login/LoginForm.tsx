"use client";

import { InputWithError } from "@/components/common/InputWithError";
import SocialLoginButtons from "@/components/common/SocialLoginButtons";
import { logIn } from "@/actions/login";
import { useFormState } from "react-dom";
import { PASSWORD_MIN_LENGTH } from "@/constants/validation";
import { SubmitButton } from "@/components/common/SubmitButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LoginForm() {
  const [state, formAction] = useFormState(logIn, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요</h1>
        <h2 className="text-xl">함께 할 때 더욱 즐거운, 모임</h2>
      </div>
      <form action={formAction} className="flex flex-col gap-3 items-center">
        <InputWithError
          name="email"
          type="email"
          placeholder="이메일"
          required
          errors={state?.fieldErrors.email}
        />
        <InputWithError
          name="password"
          type="password"
          placeholder="비밀번호"
          minLength={PASSWORD_MIN_LENGTH}
          required
          errors={state?.fieldErrors.password}
        />
        <SubmitButton className="w-full">로그인</SubmitButton>
        <div className="flex items-center">
          <span className="text-sm">계정이 없으신가요?</span>
          <Button variant="link" asChild>
            <Link href="/create-account">회원가입</Link>
          </Button>
        </div>
      </form>
      <SocialLoginButtons />
    </div>
  );
}
