'use client';

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { toast } from 'sonner';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';

import { TableToolbar } from './table-toolbar';
import { TablePagination } from './table-pagination';
import { EditableCell } from './editable-cell';

import { useTableState } from './hooks/use-table-state';
import { useEditableRow } from './hooks/use-editable-row';
import { AddUser } from './add-users';
import { Employee } from '@/types/table';
import { ColumnDef } from '@tanstack/react-table';

interface Props {
  columns: ColumnDef<Employee>[];
  data: Employee[];
}

export function EditableTable({ columns, data }: Props) {
  const state = useTableState();
  const editing = useEditableRow(data);

  const table = useReactTable({
    data: editing.data,
    columns,

    state: {
      globalFilter: state.globalFilter,
      pagination: state.pagination,
      sorting: state.sorting,
    },

    onGlobalFilterChange: state.setGlobalFilter,
    onPaginationChange: state.setPagination,
    onSortingChange: state.setSorting,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),

    meta: {
      editingRowId: editing.editingRowId,
      validationErrors: editing.validationErrors,
      onEdit: editing.startEdit,
      onCancel: editing.cancelEdit,
      onSave: editing.saveEdit,
      onDelete: (id: number) => {
        const userToDelete = editing.data.find(r => r.id === id);
        editing.setData((prev) =>
          prev.filter((r) => r.id !== id)
        );
        if (userToDelete) {
          toast.success(`User "${userToDelete.name}" has been deleted successfully!`);
        }
      },
    },
  });

  return (
    <div className="space-y-4">

         <div className="flex justify-between items-center mb-4">
  <h2 className="text-lg font-semibold">Users</h2>

  <AddUser
    onAdd={(newUser: Employee) => {
      editing.setData((prev) => [newUser, ...prev]);
    }}
  />
</div>

      {/* TOOLBAR */}
      <TableToolbar table={table} />

     

      {/* TABLE */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={table.getHeaderGroups()[0]?.headers.length || 1} 
                  className="text-center py-8 text-muted-foreground"
                >
                  No user found
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => {
                const isEditing =
                  editing.editingRowId === row.original.id;

                return (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      const meta =
                        cell.column.columnDef.meta as { editable?: boolean } | undefined;

                      // Use custom cell renderer if it exists (like for actions column)
                      if (cell.column.columnDef.cell && !meta?.editable) {
                        return (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell key={cell.id}>
                          <EditableCell
                            value={cell.getValue()}
                            rowId={row.original.id}
                            columnId={cell.column.id}
                            meta={meta}
                            isEditing={isEditing}
                            draft={editing.draftRow}
                            setDraft={editing.setDraftRow}
                            validationErrors={editing.validationErrors}
                          />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
      <TablePagination table={table} />
    </div>
  );
}