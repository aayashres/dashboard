import { AppNavbar } from "./navbar";
import { AppSidebar } from "./sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />

      <div className="flex-1 flex flex-col">
        <AppNavbar />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
