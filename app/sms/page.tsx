"use client";

import { smsVerification } from "@/actions/sms";
import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";

export default function SMSLogin() {
  const [state, formAction] = useFormState(smsVerification, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS 로그인</h1>
        <h2 className="text-xl">모임에 참여하기 위한 과정이에요!</h2>
      </div>
      <form action={formAction} className="flex flex-col gap-3">
        <Input name="phone" type="text" placeholder="휴대폰 번호" required />
        <Input
          name="verify"
          type="text"
          placeholder="인증 번호"
          required
          min={100000}
          max={999999}
        />
        <Button text="인증하기" />
      </form>
    </div>
  );
}
