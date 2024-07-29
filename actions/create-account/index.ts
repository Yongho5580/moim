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
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
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

const checkUniqueEmail = async (email: string) => {
  const data = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(data);
};

const checkUniqueUsername = async (username: string) => {
  const data = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(data);
};

const schema = z
  .object({
    username: z
      .string({
        invalid_type_error: USERNAME_MESSAGES["INVALID_TYPE"],
        required_error: USERNAME_MESSAGES["REQUIRED"],
      })
      .min(3, USERNAME_MESSAGES["MIN"])
      .max(10, USERNAME_MESSAGES["MAX"])
      .trim()
      .refine(checkUniqueUsername, USERNAME_MESSAGES["DUPLICATE"]),
    email: z
      .string()
      .email(EMAIL_MESSAGES["INVALID_EMAIL"])
      .toLowerCase()
      .refine(checkUniqueEmail, EMAIL_MESSAGES["DUPLICATE"]),
    password: z
      .string()
      .min(10, PASSWORD_MESSAGES["MIN"])
      .regex(PASSWORD_REGEX, PASSWORD_MESSAGES["REGEX"]),
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
    const cookie = await getIronSession(cookies(), {
      cookieName: "moim-cookie",
      password: process.env.COOKIE_PASSWORD!,
    });
    // 세션 ID 추출
    //@ts-ignore
    // 쿠키에 세션 ID 할당
    cookie.id = user.id;
    // 쿠키를 암호화한 뒤 브라우저에 저장
    await cookie.save();
    // 6. "/home"으로 리다이렉트
    redirect("/profile");
  }
}
