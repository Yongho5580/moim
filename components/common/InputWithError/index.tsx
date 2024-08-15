import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";

interface IInputWithErrorProps {
  name: string;
  errors?: string[];
}

export default function InputWithError({
  errors = [],
  name,
  ...props
}: IInputWithErrorProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <Input name={name} {...props} />
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </>
  );
}
