import { AppSidebar } from "@/components/NavigationBar/app-sidebar";
import TopNavBar from "@/components/NavigationBar/TopNavBar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="flex min-h-screen w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col bg-[#FAF7F7]">
        <nav>
          <TopNavBar />
        </nav>
        <div className="flex-1 px-4">{children}</div>
      </div>
    </SidebarProvider>
  );
}
