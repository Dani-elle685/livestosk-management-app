import { AppSidebar } from "@/components/NavigationBar/app-sidebar";
import TopNavBar from "@/components/NavigationBar/TopNavBar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="flex w-full min-h-screen">
      <AppSidebar />
      <div className="flex-1 flex flex-col w-full bg-[#FAF7F7]">
        <nav className="">
          <TopNavBar/>
        </nav>
        <div className="flex-1 px-4">{children}</div>
      </div>
    </SidebarProvider>
  );
}
