"use server";
import { db } from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";

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

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export async function getInitialProducts() {
  const products = db.product.findMany({
    select: {
      id: true,
      title: true,
      location: true,
      price: true,
      photo: true,
      created_at: true,
    },
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export async function getMoreProducts(page: number) {
  const products = await db.product.findMany({
    select: {
      title: true,
      location: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    skip: page * 1,
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}
