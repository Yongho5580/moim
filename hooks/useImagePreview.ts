import { useState } from "react";

import { z } from "zod";

const schema = z.object({
  type: z.string().refine((value) => value.includes("image"), {
    message: "이미지만 업로드 할 수 있어요.",
  }),
  size: z.number().max(1024 * 1024 * 3, {
    message: "이미지는 3MB 미만으로 업로드 할 수 있어요.",
  }),
});

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
    const result = schema.safeParse(file);
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
