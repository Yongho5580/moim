"use client";

import { createAccount } from "@/actions/create-account";
import { InputWithError } from "@/components/common/InputWithError";
import SocialLoginButtons from "@/components/common/SocialLoginButtons";
import { PASSWORD_MIN_LENGTH } from "@/constants/validation";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/common/SubmitButton";

export default function CreateAccount() {
  const [state, formAction] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">회원 가입</h1>
        <h2 className="text-xl">모임에 참여하기 위한 과정이에요!</h2>
      </div>
      <form action={formAction} className="flex flex-col gap-3">
        <InputWithError
          name="username"
          type="text"
          placeholder="이름"
          required
          errors={state?.fieldErrors.username}
          minLength={3}
          maxLength={10}
        />
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
          required
          errors={state?.fieldErrors.password}
          minLength={PASSWORD_MIN_LENGTH}
        />
        <InputWithError
          name="confirm_password"
          type="password"
          placeholder="비밀번호 확인"
          required
          errors={state?.fieldErrors.confirm_password}
          minLength={PASSWORD_MIN_LENGTH}
        />
        <SubmitButton>회원 가입</SubmitButton>
      </form>
      <SocialLoginButtons />
    </div>
  );
}
