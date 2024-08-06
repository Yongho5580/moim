interface IPostContentProps {
  title: string;
  description: string;
}

export default function PostContent({ title, description }: IPostContentProps) {
  return (
    <>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mb-5">{description}</p>
    </>
  );
}
