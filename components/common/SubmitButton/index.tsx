"use client";

import { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import {
  Button as ShadcnButton,
  ButtonProps as ShadcnButtonProps,
} from "@/components/ui/button";

export default function SubmitButton({
  children,
  ...props
}: ShadcnButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  return (
    <ShadcnButton
      className="flex items-center justify-center"
      disabled={pending}
      {...props}
    >
      {pending ? <Loader2 className="mr-2 w-4 h-4 animate-spin" /> : children}
    </ShadcnButton>
  );
}
