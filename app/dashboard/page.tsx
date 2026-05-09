import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border p-6">
          <h2 className="text-sm text-muted-foreground">Revenue</h2>
          <p className="text-3xl font-bold">$124,000</p>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-sm text-muted-foreground">Users</h2>
          <p className="text-3xl font-bold">12,431</p>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-sm text-muted-foreground">Growth</h2>
          <p className="text-3xl font-bold">14%</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
