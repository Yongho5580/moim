"use server";

import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";
import { PHONE_MESSAGES, TOKEN_MESSAGES } from "@/constants/messages";
import { db } from "@/lib/db";
import crypto from "crypto";
import { setSession } from "@/lib/session";

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    PHONE_MESSAGES["INVALID_TYPE"]
  );

const tokenSchema = z.coerce
  .number()
  .min(100000)
  .max(999999)
  .refine(tokenExists, TOKEN_MESSAGES["INVALID"]);

interface ActionState {
  token: boolean;
}

async function getToken() {
  const token = crypto.randomInt(100000, 999999).toString();
  const exists = await db.sMSToken.findUnique({
    where: {
      token,
    },
    select: {
      id: true,
    },
  });
  if (exists) {
    return getToken();
  } else {
    return token;
  }
}

async function tokenExists(token: number) {
  const exists = await db.sMSToken.findUnique({
    where: {
      token: token.toString(),
    },
    select: {
      id: true,
    },
  });

  return Boolean(exists);
}

export async function smsLogIn(prevState: ActionState, formData: FormData) {
  const phone = formData.get("phone");
  const token = formData.get("token");

  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      return { token: false, error: result.error.flatten() };
    } else {
      // delete all of previous token
      await db.sMSToken.deleteMany({
        where: {
          user: {
            phone: result.data,
          },
        },
      });
      const token = await getToken();
      await db.sMSToken.create({
        data: {
          token,
          user: {
            connectOrCreate: {
              where: {
                phone: result.data,
              },
              create: {
                username: crypto.randomBytes(10).toString("hex"),
                phone: result.data,
              },
            },
          },
        },
      });
      return { token: true };
    }
    // create token
    // send the token using twilio
  } else {
    const result = await tokenSchema.safeParseAsync(token);
    if (!result.success) {
      return { token: true, error: result.error.flatten() };
    } else {
      const token = await db.sMSToken.findUnique({
        where: {
          token: result.data?.toString(),
        },
        select: {
          id: true,
          userId: true,
        },
      });
      await setSession(token!.userId);
      await db.sMSToken.delete({
        where: {
          id: token!.id,
        },
      });
      redirect("/profile");
    }
  }
}
