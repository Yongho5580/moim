"use client";

import { PhotoIcon } from "@heroicons/react/24/solid";
import Input from "../common/InputWithError";
import { useImagePreview } from "@/hooks/useImagePreview";
import { useFormState } from "react-dom";
import { typeToFlattenedError } from "zod";
import { useEffect } from "react";
import SubmitButton from "../common/SubmitButton";
import { Label } from "../ui/label";

interface IProfileFormProps {
  action: (
    _: any,
    formData: FormData
  ) => Promise<
    | typeToFlattenedError<
        {
          username: string;
          avatar: string;
        },
        string
      >
    | undefined
  >;
  initialState?: any;
}

export default function ProfileForm({
  action,
  initialState = {},
}: IProfileFormProps) {
  const { preview, setPreview, onImageChange } = useImagePreview();
  const [state, formAction] = useFormState(action, null);

  useEffect(() => {
    if (initialState.avatar) {
      setPreview(initialState.avatar);
    }
  }, [initialState.avatar, setPreview]);

  return (
    <form action={formAction} className="p-5 flex flex-col items-center gap-5">
      <label
        htmlFor="avatar"
        className="w-32 h-32 border-neutral-300 rounded-full border-2 border-dashed cursor-pointer bg-center bg-cover"
        style={{
          backgroundImage: `url(${preview})`,
        }}
      >
        <>
          {preview === "" ? (
            <div className="flex flex-col items-center justify-center h-full">
              <PhotoIcon className="w-12" />
              <div className="text-neutral-400 text-sm">
                사진 추가
                <div className="text-red-500 font-medium">
                  {state?.fieldErrors.avatar}
                </div>
              </div>
            </div>
          ) : null}
        </>
      </label>
      <input
        onChange={onImageChange}
        type="file"
        id="avatar"
        name="avatar"
        accept="image/*"
        className="hidden"
      />
      <div className="flex flex-col gap-1.5 w-full">
        <Label htmlFor="username">이름</Label>
        <Input
          defaultValue={initialState.username ?? ""}
          name="username"
          required
          placeholder="이름을 입력하세요."
          type="text"
          errors={state?.fieldErrors.username}
        />
      </div>
      <SubmitButton className="w-full">수정 완료</SubmitButton>
    </form>
  );
}
