"use client";

import { PhotoIcon } from "@heroicons/react/24/solid";
import { InputWithError } from "../common/InputWithError";
import { useImagePreview } from "@/hooks/useImagePreview";
import { useFormState } from "react-dom";
import { typeToFlattenedError } from "zod";
import { useEffect } from "react";
import { SubmitButton } from "../common/SubmitButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IGatheringFormProps {
  action: (
    _: any,
    formData: FormData
  ) => Promise<
    | typeToFlattenedError<
        {
          title: string;
          description: string;
          price: number;
          location: string;
          photo: string;
          maxParticipants: number;
        },
        string
      >
    | undefined
  >;
  initialState?: any;
  id: string;
}

export default function GatheringForm({
  action,
  initialState = {},
  id,
}: IGatheringFormProps) {
  const { preview, setPreview, onImageChange } = useImagePreview();

  useEffect(() => {
    if (initialState.photo) {
      setPreview(initialState.photo);
    }
  }, [initialState.photo, setPreview]);

  const interceptAction = async (_: any, formData: FormData) => {
    if (!initialState.endDate) {
      const now = new Date();
      const endDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      formData.append("endDate", endDate.toISOString());
    } else {
      formData.append("endDate", initialState.endDate);
    }

    return action(_, formData);
  };

  const [state, formAction] = useFormState(interceptAction, null);
  return (
    <form action={formAction} className="p-5 flex flex-col gap-5">
      <label
        htmlFor="photo"
        className="border-2 aspect-square flex flex-col items-center justify-center text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover "
        style={{
          backgroundImage: `url(${preview})`,
        }}
      >
        <>
          {preview === "" ? (
            <>
              <PhotoIcon
                className={`${
                  state?.fieldErrors.photo
                    ? "text-red-500 w-20"
                    : "text-neutral-400 w-20"
                }`}
              />
              <div>
                <span
                  className={`${
                    state?.fieldErrors.photo
                      ? "text-red-500 text-sm font-semibold"
                      : "text-neutral-400 text-sm"
                  }`}
                >
                  사진을 추가해주세요
                </span>
              </div>
            </>
          ) : null}
        </>
      </label>
      <input
        onChange={onImageChange}
        type="file"
        id="photo"
        name="photo"
        accept="image/*"
        className="hidden"
      />
      <input type="hidden" name="id" className="hidden" defaultValue={id} />
      <InputWithError
        defaultValue={initialState.title ?? ""}
        name="title"
        placeholder="제목"
        type="text"
        errors={state?.fieldErrors.title}
      />
      <InputWithError
        defaultValue={initialState.description ?? ""}
        name="description"
        placeholder="설명"
        type="text"
        errors={state?.fieldErrors.description}
      />
      <InputWithError
        defaultValue={initialState.location ?? ""}
        name="location"
        placeholder="모임 장소"
        type="text"
        errors={state?.fieldErrors.location}
      />
      <InputWithError
        defaultValue={initialState.price ?? ""}
        name="price"
        placeholder="모임 비용"
        type="number"
        errors={state?.fieldErrors.price}
      />
      <Select name="status" defaultValue="open">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="모집 상태" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="open">모집 중</SelectItem>
          <SelectItem value="closed">모집 종료</SelectItem>
        </SelectContent>
      </Select>
      <InputWithError
        defaultValue={initialState.maxParticipants ?? ""}
        name="maxParticipants"
        required
        placeholder="최대 인원 수"
        type="number"
        errors={state?.fieldErrors.maxParticipants}
      />
      <SubmitButton>작성 완료</SubmitButton>
    </form>
  );
}
