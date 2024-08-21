"use client"; // 이 파일이 클라이언트에서 실행되어야 함을 지정

import { convertUTCToLocalTime } from "@/lib/utils";
import { useEffect, useRef } from "react";

function useCountdown(
  endDate: Date,
  countdownRef: React.RefObject<HTMLTimeElement>
) {
  useEffect(() => {
    const updateCountdown = () => {
      const timeDifference = endDate.getTime() - new Date().getTime();

      if (timeDifference <= 0) {
        clearInterval(intervalId);
        if (countdownRef.current) {
          countdownRef.current.textContent = "00:00:00";
        }
        return;
      }

      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      if (countdownRef.current) {
        countdownRef.current.textContent = `${String(hours).padStart(
          2,
          "0"
        )}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
          2,
          "0"
        )} 남음`;
      }
    };

    const intervalId = setInterval(updateCountdown, 1000);

    // 처음 한 번 즉시 업데이트
    updateCountdown();

    return () => clearInterval(intervalId);
  }, [endDate, countdownRef]);
}

export default function Countdown({ endDate }: { endDate: Date }) {
  const countdownRef = useRef(null);

  useCountdown(endDate, countdownRef);

  return (
    <time
      ref={countdownRef}
      className="shrink-0 rounded-sm border px-2 pb-0.5 pt-1 text-xs border-gray-white border-opacity-30 bg-gray-900 bg-opacity-40 text-gray-400"
    >
      {/* 초기값을 설정하지 않으면 useEffect에서 첫 업데이트 전에 내용이 바뀔 수 있음 */}
    </time>
  );
}
