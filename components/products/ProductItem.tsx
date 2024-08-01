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
    <Link href={`/products/${id}`} className="flex gap-5">
      <div className="relative size-28 rounded-md overflow:hidden">
        <Image fill src={photo} alt={title} />
      </div>
      <div className="flex flex-col gap-1 *:text-white ">
        <span className="text-lg">{title}</span>
        <span className="text-sm text-neutral-500">
          {created_at.toISOString()}
        </span>
        <span className="text-sm text-neutral-500">{location}</span>
        <span className="text-lg font-semibold">{price}</span>
      </div>
    </Link>
  );
}
