"use client";

import { uploadGathering } from "@/actions/gatherings/add";
import GatheringForm from "@/components/gatherings/GatheringForm";
import React from "react";

export default function AddGathering() {
  return (
    <div>
      <GatheringForm action={uploadGathering} id={""} />
    </div>
  );
}
