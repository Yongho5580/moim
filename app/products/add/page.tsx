"use client";

import { uploadProduct } from "@/actions/products/add";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useImagePreview } from "@/hooks/useImagePreview";
import { PhotoIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function AddProduct() {
  const { preview, onImageChange } = useImagePreview();
  return (
    <div>
      <form action={uploadProduct} className="p-5 flex flex-col gap-5">
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
          className="hidden"
          accept="image/jpg, image/png, image/jpeg"
        />
        <Input name="title" required placeholder="제목" type="text" />
        <Input name="description" required placeholder="설명" type="text" />
        <Input name="location" required placeholder="모임 장소" type="text" />
        <Input name="price" required placeholder="모임비" type="text" />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
