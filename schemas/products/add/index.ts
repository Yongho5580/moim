import { z } from "zod";

export const ADD_PRODUCT_SCHEMA = z.object({
  title: z.string({
    required_error: "제목을 작성해주세요.",
  }),
  description: z.string({
    required_error: "설명을 작성해주세요.",
  }),
  price: z.coerce.number({
    required_error: "모임비를 작성해주세요.",
  }),
  location: z.string({
    required_error: "모임 장소를 작성해주세요.",
  }),
  photo: z.string({
    required_error: "사진을 한 장 이상 첨부해주세요.",
  }),
});

export const UPLOAD_IMAGE_SCHEMA = z.object({
  type: z.string().refine((value) => value.includes("image"), {
    message: "이미지만 업로드 할 수 있어요.",
  }),
  size: z.number().max(1024 * 1024 * 3, {
    message: "이미지는 3MB 미만으로 업로드 할 수 있어요.",
  }),
});
