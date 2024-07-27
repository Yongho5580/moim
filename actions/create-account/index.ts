"use server";

import {
  EMAIL_MESSAGES,
  NICKNAME_MESSAGES,
  PASSWORD_MESSAGES,
} from "@/constants/messages";
import { z } from "zod";

const checkPasswordMatch = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => {
  return password === confirm_password;
};

// At least one uppercase letter, one lowercase letter, one number and one special character
const passwordRegex = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
);

const schema = z
  .object({
    username: z
      .string({
        invalid_type_error: NICKNAME_MESSAGES["INVALID_TYPE"],
        required_error: NICKNAME_MESSAGES["REQUIRED"],
      })
      .min(3, NICKNAME_MESSAGES["MIN"])
      .max(10, NICKNAME_MESSAGES["MAX"])
      .trim(),
    email: z.string().email(EMAIL_MESSAGES["INVALID_EMAIL"]).toLowerCase(),
    password: z
      .string()
      .min(10, PASSWORD_MESSAGES["MIN"])
      .regex(passwordRegex, PASSWORD_MESSAGES["REGEX"]),
    confirm_password: z.string().min(10, PASSWORD_MESSAGES["MIN"]),
  })
  .refine(checkPasswordMatch, {
    message: PASSWORD_MESSAGES["MISMATCH"],
    path: ["confirm_password"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = schema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
