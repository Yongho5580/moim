import { LoginForm } from "@/components/login/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
};

export default function Login() {
  return <LoginForm />;
}
