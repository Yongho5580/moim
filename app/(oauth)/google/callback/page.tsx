"use client";

import { getGoogleToken } from "@/lib/google";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GoogleComplete() {
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const { access_token } = await getGoogleToken();
      router.push(`/google/complete?access_token=${access_token}`);
    };
    getData();
  }, [router]);

  return null;
}
