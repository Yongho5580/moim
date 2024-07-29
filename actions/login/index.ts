"use server";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "@/constants/validation";
import { PASSWORD_MESSAGES } from "@/constants/messages";
import { redirect } from "next/navigation";

import { z } from "zod";

const schema = z.object({
  email: z.string().email().toLowerCase(),
  password: z
    .string({
      required_error: PASSWORD_MESSAGES["REQUIRED"],
    })
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_MESSAGES["REGEX"]),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  console.log(data);
  const result = schema.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
