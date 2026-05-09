'use client';

import { Input } from '@/components/ui/input';
import { ColumnVisibility } from './column-visibility';
import { Table } from '@tanstack/react-table';
import { Employee } from '@/types/table';

interface Props {
  table: Table<Employee>;
}

export function TableToolbar({ table }: Props) {
  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      {/* Search */}
      <Input
        placeholder="Search..."
        value={table.getState().globalFilter ?? ''}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />

      {/* Column toggle */}
      <ColumnVisibility columns={table.getAllColumns()} />
    </div>
  );
}