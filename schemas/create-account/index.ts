import {
  EMAIL_MESSAGES,
  PASSWORD_MESSAGES,
  USERNAME_MESSAGES,
} from "@/constants/messages";
import { PASSWORD_REGEX } from "@/constants/validation";
import { db } from "@/lib/db";
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

export const CREATE_ACCOUNT_SCHEMA = z
  .object({
    username: z
      .string({
        invalid_type_error: USERNAME_MESSAGES["INVALID"],
        required_error: USERNAME_MESSAGES["REQUIRED"],
      })
      .min(3, USERNAME_MESSAGES["MIN"])
      .max(10, USERNAME_MESSAGES["MAX"])
      .trim(),
    email: z.string().email(EMAIL_MESSAGES["INVALID"]).toLowerCase(),
    password: z
      .string()
      .min(10, PASSWORD_MESSAGES["MIN"])
      .regex(PASSWORD_REGEX, PASSWORD_MESSAGES["REGEX"]),
    confirm_password: z.string().min(10, PASSWORD_MESSAGES["MIN"]),
  })
  .superRefine(async ({ email }, ctx) => {
    const userByEmail = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (userByEmail) {
      ctx.addIssue({
        code: "custom",
        message: EMAIL_MESSAGES["DUPLICATE"],
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswordMatch, {
    message: PASSWORD_MESSAGES["MISMATCH"],
    path: ["confirm_password"],
  });
