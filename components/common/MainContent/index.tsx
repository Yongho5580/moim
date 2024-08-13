export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="main-content"
      className="flex flex-col flex-1 w-full max-w-screen-sm items-stretch bg-white mb-16"
    >
      {children}
    </div>
  );
}
