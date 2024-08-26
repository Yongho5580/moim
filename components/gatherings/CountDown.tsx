"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { useRef } from "react";

interface CountdownProps {
  endDate: Date;
  status: string;
  variant?: "primary" | "secondary";
}

export default function Countdown({
  endDate,
  status,
  variant = "primary",
}: CountdownProps) {
  const countdownRef = useRef(null);
  useCountdown(endDate, status, countdownRef);
  const baseClasses = "shrink-0 rounded-sm border px-2 pb-0.5 pt-1 text-xs";

  const variantClasses =
    variant === "primary"
      ? "border-gray-white border-opacity-30 bg-gray-900 bg-opacity-40 text-gray-400"
      : "border-gray-300 bg-gray-400 text-neutral-100";

  return (
    <time ref={countdownRef} className={`${baseClasses} ${variantClasses}`}>
      00:00:00 남음
    </time>
  );
}
