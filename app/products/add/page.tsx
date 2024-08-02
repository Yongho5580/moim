"use client";

import { uploadProduct } from "@/actions/products/add";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useImagePreview } from "@/hooks/useImagePreview";
import { PhotoIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useFormState } from "react-dom";

export default function AddProduct() {
  const { preview, onImageChange } = useImagePreview();
  const [state, formAction] = useFormState(uploadProduct, null);
  return (
    <div>
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
        <Input
          name="title"
          required
          placeholder="제목"
          type="text"
          errors={state?.fieldErrors.title}
        />
        <Input
          name="description"
          required
          placeholder="설명"
          type="text"
          errors={state?.fieldErrors.description}
        />
        <Input
          name="location"
          required
          placeholder="모임 장소"
          type="text"
          errors={state?.fieldErrors.location}
        />
        <Input
          name="price"
          required
          placeholder="모임비"
          type="text"
          errors={state?.fieldErrors.price}
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
