"use client";

import { EMAIL_MESSAGES, USERNAME_MESSAGES } from "@/constants/messages";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Error() {
  const searchParams = useSearchParams();
  const error = searchParams.get("message");
  useEffect(() => {
    if (error === "username_duplicate") {
      alert(USERNAME_MESSAGES["DUPLICATE"]);
      return redirect("/login");
    } else if (error === "email_duplicate") {
      alert(EMAIL_MESSAGES["DUPLICATE"]);
      return redirect("/login");
    }
  }, [error]);

  return <></>;
}
