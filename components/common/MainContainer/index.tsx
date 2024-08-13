export default function MainContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="main-container"
      className="flex flex-col items-center justify-center min-h-screen w-full"
    >
      {children}
    </div>
  );
}
