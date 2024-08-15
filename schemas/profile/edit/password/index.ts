import { PASSWORD_MESSAGES } from "@/constants/messages";
import { PASSWORD_REGEX } from "@/constants/validation";
import { db } from "@/lib/db";
import getSession from "@/lib/session";
import bcrypt from "bcrypt";
import { z } from "zod";

const checkAuthTypeIsEmail = async () => {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: { id: session.id },
    select: { auth_type: true },
  });

  return user?.auth_type === "email";
};

const checkPasswordIsDifferent = async (inputPassword: string) => {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: { id: session.id },
    select: { password: true },
  });

  const isMatch = await bcrypt.compare(inputPassword, user?.password!);

  return isMatch;
};

const checkPasswordMatch = ({
  newPassword,
  checkNewPassword,
}: {
  newPassword: string;
  checkNewPassword: string;
}) => {
  if (newPassword !== checkNewPassword) {
    return false;
  }
  return true;
};

export const UPDATE_PASSWORD_SCHEMA = z
  .object({
    currentPassword: z
      .string()
      .min(10, PASSWORD_MESSAGES["MIN"])
      .refine(checkPasswordIsDifferent, {
        message: PASSWORD_MESSAGES["MISMATCH"],
        path: ["currentPassword"],
      }),
    newPassword: z
      .string({ required_error: PASSWORD_MESSAGES["REQUIRED"] })
      .min(10, PASSWORD_MESSAGES["MIN"])
      .regex(PASSWORD_REGEX, PASSWORD_MESSAGES["REGEX"])
      .refine(checkAuthTypeIsEmail, {
        message: PASSWORD_MESSAGES["INVALID"],
        path: ["newPassword"],
      }),
    checkNewPassword: z
      .string({ required_error: PASSWORD_MESSAGES["REQUIRED"] })
      .min(10, PASSWORD_MESSAGES["MIN"]),
  })
  .superRefine((data, ctx) => {
    const { newPassword, checkNewPassword } = data;
    if (!checkPasswordMatch({ newPassword, checkNewPassword })) {
      ctx.addIssue({
        code: "custom",
        path: ["checkNewPassword"],
        message: PASSWORD_MESSAGES["MISMATCH"],
        fatal: true,
      });
      return z.NEVER;
    }
  });
