import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface IFloatingAddButtonProps {
  href: string;
}

export default async function FloatingAddButton({
  href,
}: IFloatingAddButtonProps) {
  return (
    <Button
      asChild
      className="flex items-center justify-center rounded-full size-16 fixed bottom-24 right-3 transition-colors"
    >
      <Link href={href}>
        <PlusIcon className="size-10" />
      </Link>
    </Button>
  );
}
