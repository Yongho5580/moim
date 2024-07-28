"use server";

import { PASSWORD_REGEX } from "@/constants";
import { db } from "@/constants/db";
import {
  EMAIL_MESSAGES,
  USERNAME_MESSAGES,
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
    // 1. 유저네임 고유 체크
    const user = await db.user.findUnique({
      where: {
        username: result.data.username,
      },
      select: {
        id: true,
      },
    });
    const email = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
      },
    });
    // 2. 이메일 고유 체크
    // 3. 비밀번호 해싱
    // 4. DB에 유저 저장
    // 5. 유저 로그인
    // 6. "/home"으로 리다이렉트
  }
}
