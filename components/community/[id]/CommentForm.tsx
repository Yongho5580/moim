import { InputWithError } from "@/components/common/InputWithError";
import { SubmitButton } from "@/components/common/SubmitButton";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";

interface ICommentFormProps {
  postId: number;
  formAction: (payload: FormData) => void;
}

export default function CommentForm({ postId, formAction }: ICommentFormProps) {
  return (
    <form action={formAction} className="flex relative">
      <input type="hidden" className="hidden" value={postId} />
      <InputWithError
        type="text"
        name="payload"
        placeholder="댓글을 입력해주세요."
      />
      <SubmitButton variant="none" size="icon" className="absolute right-0">
        <ArrowUpCircleIcon className="size-10 text-primary transition-colors hover:text-primary-hover" />
      </SubmitButton>
    </form>
  );
}
