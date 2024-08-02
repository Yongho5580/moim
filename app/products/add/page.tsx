import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { PhotoIcon } from "@heroicons/react/24/solid";

export default function AddProduct() {
  return (
    <div>
      <form className="flex flex-col gap-5">
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex flex-col items-center justify-center text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer"
        >
          <PhotoIcon className="w-20" />
          <div className="text-neutral-400 text-sm">사진을 추가해주세요</div>
        </label>
        <input type="file" id="photo" name="photo" className="hidden" />
        <Input name="title" required placeholder="제목" type="text" />
        <Input name="title" required placeholder="제목" type="text" />
        <Input name="title" required placeholder="제목" type="text" />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
