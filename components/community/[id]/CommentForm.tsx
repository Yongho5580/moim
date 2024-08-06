import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

interface ICommentFormProps {
  postId: number;
  formAction: (payload: FormData) => void;
}

export default function CommentForm({ postId, formAction }: ICommentFormProps) {
  return (
    <form action={formAction} className="mb-4">
      <input type="hidden" value={postId} />
      <Input type="text" name="payload" placeholder="댓글을 입력해주세요." />
      <Button text="작성 완료" />
    </form>
  );
}
