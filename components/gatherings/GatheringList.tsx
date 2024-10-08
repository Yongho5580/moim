"use client";

import { getMoreGatherings, InitialGatherings } from "@/actions/gatherings";
import GatheringItem from "./GatheringItem";
import { useEffect, useRef, useState } from "react";

interface IGatheringListProps {
  initialGatherings: InitialGatherings;
}

export default function GatheringList({
  initialGatherings,
}: IGatheringListProps) {
  const [gatherings, setGatherings] = useState(initialGatherings);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // 2. 요소가 100% (1.0) 화면에 보였을 경우 실행될 함수
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newGatherings = await getMoreGatherings(page + 1);
          if (newGatherings.length !== 0) {
            // 3. 여기서 의존성 배열에 page를 넣었기 때문에 useEffect 리렌더
            setPage((prev) => prev + 1);
            setGatherings((prev) => [...prev, ...newGatherings]);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      {
        threshold: 1.0,
      }
    );

    // 1. 렌더 후 span 값이 ref에 할당됐다면 관찰 시작
    if (trigger.current) {
      observer.observe(trigger.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className="flex w-full flex-col px-side py-5 items-center justify-start gap-4">
      {gatherings.map((post) => (
        <GatheringItem key={post.id} isOwner={false} {...post} />
      ))}
      {/* {!isLastPage ? (
        <span
          ref={trigger}
          className="mb-96 text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩 중" : "Load more"}
        </span>
      ) : null} */}
    </div>
  );
}
