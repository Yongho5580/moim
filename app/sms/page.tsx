"use client";

import { smsLogIn } from "@/actions/sms";
import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, formAction] = useFormState(smsLogIn, initialState);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS 로그인</h1>
        <h2 className="text-xl">모임에 참여하기 위한 과정이에요!</h2>
      </div>
      <form action={formAction} className="flex flex-col gap-3">
        {state.token ? (
          <Input
            key="token"
            name="token"
            type="text"
            placeholder="인증 번호"
            required
            min={100000}
            max={999999}
            errors={state.error?.formErrors}
          />
        ) : (
          <Input
            key="phone"
            name="phone"
            type="tel"
            placeholder="휴대폰 번호"
            required
            errors={state.error?.formErrors}
          />
        )}
        <Button text={state.token ? "확인" : "문자로 인증하기"} />
      </form>
    </div>
  );
}
