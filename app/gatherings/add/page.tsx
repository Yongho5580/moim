import { uploadGathering } from "@/actions/gatherings/add";
import GatheringForm from "@/components/gatherings/GatheringForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "모임 생성",
};

export default function AddGathering() {
  return <GatheringForm action={uploadGathering} id={""} />;
}
