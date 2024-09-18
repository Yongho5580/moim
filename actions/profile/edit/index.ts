"use server";

import { AWS_S3_BASE_URL } from "@/constants/config";
import { db } from "@/lib/db";
import getSession from "@/lib/session";
import { preparePhotoData, uploadS3 } from "@/lib/utils";
import { UPDATE_PROFILE_SCHEMA } from "@/schemas/profile/edit";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getCachedUser } from "..";

export async function updateProfile(_: any, formData: FormData) {
  const file = formData.get("avatar");
  const id = formData.get("id");
  let photoUrl = "";
  if (!id) return;
  if (
    file instanceof File &&
    file.size !== 0 &&
    file.name !== "undefined" &&
    file.type.startsWith("image/")
  ) {
    const { name, body } = await preparePhotoData(file);
    const type = file.type;
    await uploadS3({ name, body, type });
    photoUrl = `${AWS_S3_BASE_URL}/${name}`;
    formData.set("avatar", photoUrl);
  } else {
    const user = await getCachedUser(+id);
    if (!user.avatar) {
      formData.set("avatar", "");
    } else {
      formData.set("avatar", user.avatar);
    }
  }

  const data = {
    username: formData.get("username"),
    avatar: formData.get("avatar"),
  };

  const result = await UPDATE_PROFILE_SCHEMA.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const { username, avatar } = result.data;
    const user = await db.user.update({
      where: {
        id: +id,
      },
      data: {
        username,
        avatar,
      },
      select: {
        id: true,
      },
    });
    revalidateTag(`user-${user.id}`);
    redirect("/profile");
  }
}
