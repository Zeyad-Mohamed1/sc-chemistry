import { getUser } from "@/actions/admin/user";
import { AdminSidebar } from "@/components/dashboard/admin-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  if (user === null || user?.isAdmin === false) {
    return redirect("/");
  }

  return (
    <SidebarProvider>
      <div className="w-full min-h-screen flex">
        <AdminSidebar />
        <main className="flex-1 p-1 md:p-4 lg:p-6 relative">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
