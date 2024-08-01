"use server";
import { db } from "@/lib/db";
import getSession from "@/lib/session";

export async function getIsOwner(userId: number) {
  const session = await getSession();

  if (session.id) {
    return session.id === userId;
  }
  return false;
}

export async function getProduct(productId: number) {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return product;
}
