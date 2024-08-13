import Input from "@/components/common/Input";
import SubmitButton from "@/components/common/SubmitButton";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";

interface ICommentFormProps {
  postId: number;
  formAction: (payload: FormData) => void;
}

export default function CommentForm({ postId, formAction }: ICommentFormProps) {
  return (
    <form action={formAction} className="flex relative">
      <input type="hidden" className="hidden" value={postId} />
      <input
        type="text"
        name="payload"
        className="bg-transparent rounded-full w-full h-10 focus:outline-none px-5 ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-neutral-50 border-none placeholder:text-neutral-400"
        placeholder="댓글을 입력해주세요."
      />
      <SubmitButton variant="none" size="icon" className="absolute right-0">
        <ArrowUpCircleIcon className="size-10 text-primary transition-colors hover:text-primary-hover" />
      </SubmitButton>
    </form>
  );
}
