"use server";

import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";
import { PHONE_MESSAGES } from "@/constants/messages";

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    PHONE_MESSAGES["INVALID_TYPE"]
  );

const verifySchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
  verify: boolean;
}

export async function smsVerification(
  prevState: ActionState,
  formData: FormData
) {
  const phone = formData.get("phone");
  const verify = formData.get("verify");

  if (!prevState.verify) {
    const result = phoneSchema.safeParse(phone);
    return !result.success
      ? { verify: false, error: result.error.flatten() }
      : { verify: true };
  } else {
    const result = verifySchema.safeParse(verify);
    return !result.success
      ? { verify: true, error: result.error.flatten() }
      : redirect("/");
  }
}
