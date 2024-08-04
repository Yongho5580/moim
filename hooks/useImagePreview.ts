import { UPLOAD_IMAGE_SCHEMA } from "@/schemas/gatherings/add";
import { useState } from "react";

export const useImagePreview = () => {
  const [preview, setPreview] = useState("");
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files || files.length === 0) {
      setPreview("");
      return;
    }
    const file = files[0];
    const result = UPLOAD_IMAGE_SCHEMA.safeParse(file);
    if (!result.success) {
      alert(
        result.error.flatten().fieldErrors.type ||
          result.error.flatten().fieldErrors.size
      );
      return;
    }
    const preview = URL.createObjectURL(file);
    setPreview(preview);
  };

  return { preview, onImageChange };
};
