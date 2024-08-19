import { Textarea } from "@/components/ui/textarea";

interface ITextareaWithErrorProps {
  name: string;
  errors?: string[];
}

export const TextareaWithError = ({
  errors = [],
  name,
  ...props
}: ITextareaWithErrorProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <>
      <Textarea name={name} {...props} />
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </>
  );
};
