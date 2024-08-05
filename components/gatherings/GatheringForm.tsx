"use client";

import { PhotoIcon } from "@heroicons/react/24/solid";
import Input from "../common/Input";
import Button from "../common/Button";
import { useImagePreview } from "@/hooks/useImagePreview";
import { useFormState } from "react-dom";
import { typeToFlattenedError } from "zod";
import { useEffect } from "react";

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
  const [state, formAction] = useFormState(action, null);

  useEffect(() => {
    if (initialState.photo) {
      setPreview(initialState.photo);
    }
  }, [initialState.photo, setPreview]);

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
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">
                사진을 추가해주세요
                {state?.fieldErrors.photo}
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
      <Input
        defaultValue={initialState.title ?? ""}
        name="title"
        required
        placeholder="제목"
        type="text"
        errors={state?.fieldErrors.title}
      />
      <Input
        defaultValue={initialState.description ?? ""}
        name="description"
        required
        placeholder="설명"
        type="text"
        errors={state?.fieldErrors.description}
      />
      <Input
        defaultValue={initialState.location ?? ""}
        name="location"
        required
        placeholder="모임 장소"
        type="text"
        errors={state?.fieldErrors.location}
      />
      <Input
        defaultValue={initialState.price ?? ""}
        name="price"
        required
        placeholder="모임 비용"
        type="text"
        errors={state?.fieldErrors.price}
      />
      <Button text="작성 완료" />
    </form>
  );
}
