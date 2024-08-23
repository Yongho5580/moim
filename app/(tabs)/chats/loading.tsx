import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-5">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="py-5 flex flex-col gap-2 px-side border-b border-neutral-300 w-full"
        >
          <div className="flex items-center gap-3 mb-2">
            <Skeleton className="size-14 rounded-full" />
            <div className="flex flex-col gap-2 w-3/4">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-3/5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
