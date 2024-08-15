"use server";

import { db } from "@/lib/db";
import getSession from "@/lib/session";
import { UPDATE_PASSWORD_SCHEMA } from "@/schemas/profile/edit/password";
import bcrypt from "bcrypt";
import { logOut } from "../..";
import { revalidateTag } from "next/cache";

export async function updatePassword(_: any, formData: FormData) {
  const data = {
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    checkNewPassword: formData.get("checkNewPassword"),
  };

  const result = await UPDATE_PASSWORD_SCHEMA.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const { newPassword } = result.data;
    const session = await getSession();
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const user = await db.user.update({
      where: {
        id: session.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    revalidateTag(`user-${user.id}`);

    await logOut();
  }
}
