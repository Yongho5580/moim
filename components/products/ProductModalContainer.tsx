"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import ProductCloseButton from "./ProductCloseButton";

export default function ProductModalContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (event.target instanceof SVGElement) {
        return;
      }
      if (ref.current && !ref.current.contains(event.target as Node)) {
        router.back();
      }
    };

    document.addEventListener("mouseup", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mouseup", handleClick);
      document.addEventListener("touchstart", handleClick);
    };
  }, [router]);

  return (
    <div className="absolute w-full h-full z-50 flex items-center justify-center bg-neutral-800 rounded-lg bg-opacity-60 left-0 top-0 p-10">
      <ProductCloseButton />
      <div
        ref={ref}
        className="max-w-screen-md h-4/5 flex flex-col justify-center w-full bg-neutral-800 rounded-xl shadow-2xl"
      >
        {children}
      </div>
    </div>
  );
}
