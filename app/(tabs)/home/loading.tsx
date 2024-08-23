import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full px-side">
      <div className="flex flex-col gap-4">
        <div className="relative flex w-full max-w-screen-sm flex-col overflow-hidden rounded-xl">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="relative flex flex-col w-full pt-4 pb-2"
            >
              <Skeleton className="w-full aspect-[16/9] rounded-xl" />
              <div className="absolute inset-0 bg-gray-black bg-opacity-50" />
              <div className="absolute flex w-full flex-col gap-2 px-4 pb-[72px] pt-5">
                <Skeleton className="rounded-sm px-2 pb-0.5 pt-1 w-[90px] h-[24px]" />
                <Skeleton className="h-7 w-3/4 rounded-md" />
                <Skeleton className="h-5 w-1/2 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
