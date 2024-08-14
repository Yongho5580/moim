import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="auth-container"
      className="flex flex-col justify-center min-h-screen w-full"
    >
      {children}
    </div>
  );
}
