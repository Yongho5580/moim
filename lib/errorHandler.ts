import { EMAIL_MESSAGES, USERNAME_MESSAGES } from "@/constants/messages";
import { redirect } from "next/navigation";

type ErrorType = "username_duplicate" | "email_duplicate";

const errorHandlers: Record<ErrorType, () => void> = {
  username_duplicate: () => {
    alert(USERNAME_MESSAGES["DUPLICATE"]);
    redirect("/login");
  },
  email_duplicate: () => {
    alert(EMAIL_MESSAGES["DUPLICATE"]);
    redirect("/login");
  },
};

export function handleError(error: string | null) {
  if (error && isErrorType(error)) {
    errorHandlers[error]();
  }
}

function isErrorType(error: string): error is ErrorType {
  return error in errorHandlers;
}
