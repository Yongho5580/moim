import { formatToTimeAgo, formatToWon } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Countdown from "./CountDown";

interface IGatheringItemProps {
  id: number;
  title: string;
  location: string;
  price: number;
  photo: string;
  endDate: Date;
}

export default function GatheringItem({
  id,
  title,
  location,
  price,
  photo,
  endDate,
}: IGatheringItemProps) {
  return (
    <div className="w-full px-side py-4">
      <div className="flex flex-col gap-4"></div>
      <div className="relative flex w-full max-w-screen-sm flex-col overflow-hidden rounded-xl">
        <Link
          href={`/gatherings/post/${id}`}
          className="flex h-full w-full flex-col"
        >
          <div className="w-full flex-row justify-center aspect-[16/6]">
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
            <div>
              <Countdown endDate={endDate} />
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
