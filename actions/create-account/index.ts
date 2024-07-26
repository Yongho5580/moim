"use server";

import { z } from "zod";

const checkUsername = (username: string) => {
  return !username.includes("김용호");
};

const checkPasswordMatch = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => {
  return password === confirm_password;
};

// At least one uppercase letter, one lowercase letter, one number and one special character
const passwordRegex = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
);

const schema = z
  .object({
    username: z
      .string({
        invalid_type_error: "닉네임에 수상한(?) 문자가 섞인 것 같아요.",
        required_error: "닉네임을 작성해주세요.",
      })
      .min(3, "닉네임은 3글자 이상 작성해주세요.")
      .max(10, "닉네임은 10글자 이하로 작성해주세요.")
      .trim()
      .transform((username) => `🎩 ${username}`)
      .refine(
        checkUsername,
        "김용호라는 단어는 어디서 아셨죠? 이 로그는 저장됐어요."
      ),
    email: z.string().email("이메일 주소가 유효하지 않아요.").toLowerCase(),
    password: z
      .string()
      .min(10, "비밀번호는 10글자 이상 작성해주세요.")
      .regex(
        passwordRegex,
        "비밀번호는 소문자, 대문자, 숫자, 특수문자를 포함 해주세요."
      ),
    confirm_password: z.string().min(10),
  })
  .refine(checkPasswordMatch, {
    message: "비밀번호가 일치하지 않아요.",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = schema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
