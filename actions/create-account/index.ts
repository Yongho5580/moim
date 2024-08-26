"use server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { setSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { CREATE_ACCOUNT_SCHEMA } from "@/schemas/create-account";

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = await CREATE_ACCOUNT_SCHEMA.safeParseAsync(data);
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
        auth_type: "email",
      },
      select: {
        id: true,
      },
    });
    await setSession(user.id);
    return redirect("/login");
  }
}
