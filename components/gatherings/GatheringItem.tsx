"use client";

import Image from "next/image";
import Link from "next/link";
import Countdown from "./CountDown";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { deleteGathering } from "@/actions/gatherings/[id]";

interface IGatheringItemProps {
  id: number;
  title: string;
  location: string;
  price: number;
  status: string;
  photo: string;
  endDate: Date;
}

export default function GatheringItem({
  id,
  title,
  location,
  status,
  price,
  photo,
  endDate,
}: IGatheringItemProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push(`/gathering/post/${id}/edit`);
  };

  const handleDeleteClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    await deleteGathering(id);
  };

  return (
    <div className="w-full pt-4 pb-2">
      <div className="flex flex-col gap-4"></div>
      <div className="relative flex w-full max-w-screen-sm flex-col overflow-hidden rounded-xl">
        <Link
          href={`/gatherings/post/${id}`}
          className="flex h-full w-full flex-col"
        >
          <div className="w-full flex-row justify-center aspect-[16/9]">
            <Image
              fill
              priority
              sizes="112px"
              src={photo}
              alt={title}
              className="overflow-hidden object-cover aspect-[16/6] cover w-full blur-sm"
            />
          </div>
          <div className="absolute inset-0 bg-gray-black bg-opacity-50" />
          <div className="absolute flex w-full flex-col gap-2 px-4 pb-[72px] pt-5">
            <div className="flex items-center justify-between">
              <Countdown status={status} endDate={endDate} />
              {pathname === "/profile" && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleEditClick}
                  >
                    <PencilIcon className="h-5 w-h-5" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={handleDeleteClick}
                  >
                    <Trash2Icon className="h-5 w-h-5" />
                  </Button>
                </div>
              )}
            </div>
            <span className="text-lg text-slate-100 text-opacity-50 font-bold">
              {title}
            </span>
            <span className="text-sm text-slate-100 text-opacity-50">
              {location}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
