"use server";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "@/constants/validation";
import { EMAIL_MESSAGES, PASSWORD_MESSAGES } from "@/constants/messages";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

import { z } from "zod";
import { db } from "@/lib/db";
import { setSession } from "@/lib/session";

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

const schema = z.object({
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

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await schema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    // if the user is found, check password hash
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const validatePassword = await bcrypt.compare(
      result.data.password,
      user!.password ?? ""
    );

    if (validatePassword) {
      await setSession(user!.id);
      return redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: [PASSWORD_MESSAGES["INVALID"]],
          email: [],
        },
      };
    }
  }
}
