"use client";

import { createAccount } from "@/actions/create-account";
import { InputWithError } from "@/components/common/InputWithError";
import { PASSWORD_MIN_LENGTH } from "@/constants/validation";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/common/SubmitButton";

export function CreateAccountForm() {
  const [state, formAction] = useFormState(createAccount, null);
  return (
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
  );
}
