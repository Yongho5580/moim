import { useEffect } from "react";

export function useCountdown(
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
