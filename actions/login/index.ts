"use server";
import { PASSWORD_MESSAGES } from "@/constants/messages";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { setSession } from "@/lib/session";
import { LOGIN_SCHEMA } from "@/schemas/login";

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await LOGIN_SCHEMA.safeParseAsync(data);
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
