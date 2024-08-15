import { USERNAME_MESSAGES } from "@/constants/messages";
import { z } from "zod";

export const UPDATE_PROFILE_SCHEMA = z.object({
  username: z
    .string({
      required_error: USERNAME_MESSAGES["REQUIRED"],
      invalid_type_error: USERNAME_MESSAGES["INVALID"],
    })
    .min(3, USERNAME_MESSAGES["MIN"]),
  avatar: z.string({
    required_error: "사진을 한 장 이상 첨부해주세요.",
    invalid_type_error: "사진을 한 장 이상 첨부해주세요.",
  }),
});
