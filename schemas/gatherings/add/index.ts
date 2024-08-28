import { z } from "zod";

export const ADD_GATHERING_SCHEMA = z.object({
  title: z.string().min(1, "제목을 작성해주세요."),
  description: z.string().min(1, "설명을 작성해주세요."),
  price: z.coerce.number().min(1, "모임 비용을 작성해주세요."),
  location: z.string().min(1, "모임 장소를 작성해주세요."),
  endDate: z.string(),
  photo: z.string().min(1, "사진을 첨부해주세요"),
  maxParticipants: z.coerce
    .number()
    .min(2, "모임 인원은 본인 포함 2명 이상이어야 해요."),
});

export const UPLOAD_IMAGE_SCHEMA = z.object({
  type: z.string().refine((value) => value.includes("image"), {
    message: "이미지만 업로드 할 수 있어요.",
  }),
  size: z.number().max(1024 * 1024 * 3, {
    message: "이미지는 3MB 미만으로 업로드 할 수 있어요.",
  }),
});
