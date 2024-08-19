import { z } from "zod";

export const CREATE_COMMENT_SCHEMA = z.object({
  payload: z.string().min(1, "댓글을 입력해주세요."),
  postId: z.string({ required_error: "게시물 아이디는 필수입니다." }),
});

export const CREATE_COMMUNITY_SCHEMA = z.object({
  title: z.string().min(3, "제목은 3글자 이상으로 작성해주세요."),
  description: z.string().min(1, "글 내용을 작성해주세요."),
});
