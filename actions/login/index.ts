"use server";
import { redirect } from "next/navigation";

export async function handleLoginForm(prevState: any, data: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    errors: ["wrong password", "password too short"],
  };
}
