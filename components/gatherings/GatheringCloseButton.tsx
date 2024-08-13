"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function GatheringCloseButton() {
  const router = useRouter();
  const onCloseClick = () => {
    router.back();
  };
  return (
    <Button
      onClick={onCloseClick}
      variant="none"
      size="icon"
      className="absolute right-5 top-5 text-neutral-200 active:text-neutral-400"
    >
      <XMarkIcon className="size-10" />
    </Button>
  );
}
