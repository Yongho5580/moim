"use server";
import bcrypt from "bcrypt";
import { PASSWORD_REGEX } from "@/constants/validation";
import { db } from "@/lib/db";
import {
  EMAIL_MESSAGES,
  USERNAME_MESSAGES,
  PASSWORD_MESSAGES,
} from "@/constants/messages";
import { z } from "zod";
import { setSession } from "@/lib/session";
import { redirect } from "next/navigation";

const checkPasswordMatch = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => {
  return password === confirm_password;
};

const schema = z
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
  .superRefine(async ({ username }, ctx) => {
    const userByUsername = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (userByUsername) {
      ctx.addIssue({
        code: "custom",
        message: USERNAME_MESSAGES["DUPLICATE"],
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
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

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = await schema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const { password, username, email } = result.data;
    // 3. 비밀번호 해싱, 해싱 알고리즘을 12번 실행
    const hashedPassword = await bcrypt.hash(password, 12);
    // 4. DB에 유저 저장
    const user = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    await setSession(user.id);
    return redirect("/profile");
  }
}
