import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-5 flex flex-col gap-x-40">
      <div className="flex items-center gap-2 mb-2">
        <Skeleton className="rounded-full h-7 w-7" />
        <div className="flex flex-col gap-2">
          <Skeleton className="w-[90px] h-4 " />
          <Skeleton className="w-[50px] h-4" />
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <Skeleton className="w-[200px] h-7" />
        <Skeleton className="w-full h-7" />
      </div>
      <div className="flex flex-col gap-5 items-start border-b-slate-200 border-b pb-5">
        <Skeleton className="w-[80px] h-5" />
        <Skeleton className="w-[65px] h-8 rounded-full px-4 py-2" />
        <Skeleton />
      </div>
      <div className="py-5 flex flex-col gap-5">
        <Skeleton className="w-full h-10" />
      </div>
    </div>
  );
}
