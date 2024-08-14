import BottomNavigation from "@/components/common/BottomNavigation";

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-16">
      {children}
      <BottomNavigation />
    </div>
  );
}
