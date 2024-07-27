import { InputHTMLAttributes } from "react";

interface IInputProps {
  name: string;
  errors?: string[];
}

export default function Input({
  errors = [],
  name,
  ...props
}: IInputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 transition ring-neutral-200 focus:ring-emerald-500 border-none placeholder:text-neutral-400"
        {...props}
      />
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
