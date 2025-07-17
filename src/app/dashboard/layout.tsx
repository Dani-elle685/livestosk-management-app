import { AppSidebar } from "@/components/NavigationBar/app-sidebar";
import TopNavBar from "@/components/NavigationBar/TopNavBar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex gap-6 w-full bg-[#FAF7F7]">
        <section className="w-full px-4">
          <nav>
            <TopNavBar />
          </nav>
          <div> {children}</div>
        </section>
      </main>
    </SidebarProvider>
  );
}
