import { z } from "zod";

export const CREATE_COMMENT_SCHEMA = z.object({
  payload: z.string({ required_error: "댓글을 입력해주세요." }),
  postId: z.string({ required_error: "게시물 아이디는 필수입니다." }),
});
