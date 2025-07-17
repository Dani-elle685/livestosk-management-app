import { AppSidebar } from "@/components/NavigationBar/app-sidebar";
import TopNavBar from "@/components/NavigationBar/TopNavBar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="w-full">
      <AppSidebar />

      <main className="w-full bg-[#FAF7F7]">
        <nav>
          <TopNavBar />
        </nav>
        <div className=" w-full px-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
