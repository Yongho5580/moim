import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export function formatToTimeAgo(date: string): string {
  if (!date) return "";
  const dayInMs = 1000 * 60 * 60 * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);
  const formatter = new Intl.RelativeTimeFormat("ko");
  return formatter.format(diff, "days");
}

export function formatToWon(price: number): string {
  return price.toLocaleString("ko-KR");
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isPastEndDate(endDate: Date): boolean {
  const now = new Date();
  return now > endDate;
}

export function convertUTCToLocalTime() {
  const utcDate = new Date();
  const nineHoursInMillis = 9 * 60 * 60 * 1000;
  const localDate = new Date(utcDate.getTime() + nineHoursInMillis);

  return localDate;
}

export async function preparePhotoData(photo: File): Promise<{ name: string }> {
  const ext = photo.name.split(".").at(-1);
  const uid = uuidv4().replace(/-/g, "");
  const name = `${uid}${ext ? "." + ext : ""}`;
  return {
    name,
  };
}
