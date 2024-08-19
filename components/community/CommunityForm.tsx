"use client";

import { InputWithError } from "../common/InputWithError";
import { useFormState } from "react-dom";
import { typeToFlattenedError } from "zod";
import { SubmitButton } from "../common/SubmitButton";
import { Textarea } from "../ui/textarea";
import { TextareaWithError } from "../common/TextAreaWithError";

interface ICommunityFormProps {
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
}

export default function CommunityForm({
  action,
  initialState = {},
}: ICommunityFormProps) {
  const [state, formAction] = useFormState(action, null);

  return (
    <form action={formAction} className="p-5 flex flex-col gap-5">
      <InputWithError
        defaultValue={initialState.title ?? ""}
        name="title"
        required
        placeholder="제목"
        type="text"
        errors={state?.fieldErrors.title}
      />
      <TextareaWithError
        defaultValue={initialState.description ?? ""}
        name="description"
        placeholder="내용을 작성해주세요."
        errors={state?.fieldErrors.description}
      />
      <SubmitButton>작성 완료</SubmitButton>
    </form>
  );
}
