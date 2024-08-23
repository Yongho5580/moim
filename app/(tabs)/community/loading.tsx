import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="px-side">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className=" py-5 border-b border-gray-200 flex flex-col gap-2 last:pb-0 last:border-b-0"
        >
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-12 w-full" />
          <div className="flex items-center justify-between text-sm">
            <div className="flex gap-2 items-center">
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex gap-4 items-center">
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
