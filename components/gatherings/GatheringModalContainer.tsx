"use client";

import { useEffect } from "react";
import GatheringCloseButton from "./GatheringCloseButton";

export default function GatheringModalContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
  return (
    <div className="fixed inset-0 w-full h-full z-50 flex items-center justify-center bg-neutral-800 bg-opacity-60 p-10">
      <GatheringCloseButton />
      <div className="max-w-screen-sm h-4/5 flex flex-col w-full bg-background rounded-xl shadow-2xl">
        {children}
      </div>
    </div>
  );
}
