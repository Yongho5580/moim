"use client";

import { updatePassword } from "@/actions/profile/edit/password";
import { SubmitButton } from "@/components/common/SubmitButton";
import { InputWithError } from "@/components/common/InputWithError";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";

export function EditPasswordForm() {
  const [state, formAction] = useFormState(updatePassword, null);
  return (
    <form action={formAction} className="p-5 flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="currentPassword">현재 비밀번호</Label>
        <InputWithError
          name="currentPassword"
          placeholder="현재 비밀번호를 입력하세요."
          type="password"
          errors={state?.fieldErrors.currentPassword}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="newPassword">새 비밀번호</Label>
        <InputWithError
          name="newPassword"
          placeholder="새 비밀번호를 입력하세요."
          type="password"
          errors={state?.fieldErrors.newPassword}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="checkNewPassword">새 비밀번호 확인</Label>
        <InputWithError
          name="checkNewPassword"
          placeholder="새 비밀번호를 확인하세요."
          type="password"
          errors={state?.fieldErrors.checkNewPassword}
        />
      </div>
      <SubmitButton>확인</SubmitButton>
    </form>
  );
}
