import { EMAIL_MESSAGES, PASSWORD_MESSAGES } from "@/constants/messages";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "@/constants/validation";
import { db } from "@/lib/db";
import { z } from "zod";

const checkEmailExists = async (email: string) => {
  const data = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(data);
};

export const LOGIN_SCHEMA = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, EMAIL_MESSAGES["NOT_FOUND"]),
  password: z
    .string({
      required_error: PASSWORD_MESSAGES["REQUIRED"],
    })
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_MESSAGES["REGEX"]),
});
