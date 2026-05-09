'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';

import { EditableTable } from '@/components/table/editable-table';

import { employeeColumns } from '@/lib/table-config';

import { employees } from '@/lib/mock-data';

export default function TablePage() {
  return (
    <DashboardLayout>
      <EditableTable
        columns={employeeColumns}
        data={employees}
      />
    </DashboardLayout>
  );
}