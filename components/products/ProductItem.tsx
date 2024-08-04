import { formatToTimeAgo, formatToWon } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface IProductItemProps {
  id: number;
  title: string;
  location: string;
  price: number;
  photo: string;
  created_at: Date;
}

export default function ProductItem({
  id,
  title,
  location,
  price,
  photo,
  created_at,
}: IProductItemProps) {
  return (
    <Link href={`/products/p/${id}`} className="flex gap-5">
      <div className="relative size-28 rounded-md overflow:hidden">
        <Image
          fill
          priority
          sizes="112px"
          src={photo}
          alt={title}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 *:text-white ">
        <span className="text-lg">{title}</span>
        <span className="text-sm text-neutral-500">{location}</span>
        <span className="text-sm text-neutral-500">
          {formatToTimeAgo(created_at.toString())}
        </span>
        <span className="text-lg font-semibold">{formatToWon(price)}원</span>
      </div>
    </Link>
  );
}
