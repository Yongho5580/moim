import GatheringCloseButton from "./GatheringCloseButton";

export default function GatheringModalContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute w-full h-full z-50 flex items-center justify-center bg-neutral-800 rounded-lg bg-opacity-60 left-0 top-0 p-10">
      <GatheringCloseButton />
      <div className="max-w-screen-sm h-4/5 flex flex-col justify-center w-full bg-background rounded-xl shadow-2xl">
        {children}
      </div>
    </div>
  );
}
