"use client";

import { useEffect, useRef } from "react";

function useCountdown(
  endDate: Date,
  status: string,
  countdownRef: React.RefObject<HTMLTimeElement>
) {
  useEffect(() => {
    const updateCountdown = () => {
      const timeDifference = endDate.getTime() - new Date().getTime();

      if (timeDifference <= 0 || status === "closed") {
        clearInterval(intervalId);
        if (countdownRef.current) {
          countdownRef.current.textContent = "모집 종료";
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

    updateCountdown();

    return () => clearInterval(intervalId);
  }, [endDate, status, countdownRef]);
}

export default function Countdown({
  endDate,
  status,
}: {
  endDate: Date;
  status: string;
}) {
  const countdownRef = useRef(null);

  useCountdown(endDate, status, countdownRef);

  return (
    <time
      ref={countdownRef}
      className="shrink-0 rounded-sm border px-2 pb-0.5 pt-1 text-xs border-gray-white border-opacity-30 bg-gray-900 bg-opacity-40 text-gray-400"
    >
      00:00:00 남음
    </time>
  );
}
