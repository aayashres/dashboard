import React from 'react'; // Table configuration with delete confirmation
import { ColumnDef } from '@tanstack/react-table';
import { Employee, EditableColumnMeta } from '@/types/table';
import { Button } from '@/components/ui/button';
import { DeleteConfirmation } from '@/components/table/delete-confirmation';

export const employeeColumns: ColumnDef<Employee>[] = [
{
  accessorKey: 'name',
  header: ({ column }: { column: { getIsSorted: () => 'asc' | 'desc' | false; toggleSorting: (descending: boolean) => void; clearSorting: () => void } }) => {
    const isSorted = column.getIsSorted();

    const handleSort = () => {
      // ASC → DESC → NONE
      if (isSorted === 'asc') {
        column.toggleSorting(true); // desc
      } else if (isSorted === 'desc') {
        column.clearSorting(); // ❗ reset (NONE)
      } else {
        column.toggleSorting(false); // asc
      }
    };

    return (
      <button
        className="flex items-center gap-2 select-none cursor-pointer"
        onClick={handleSort}
      >
        Name

        <span className="text-xs">
          {isSorted === 'asc' && '▲'}
          {isSorted === 'desc' && '▼'}
          {!isSorted && '↕'}
        </span>
      </button>
    );
  },
  meta: {
    editable: true,
    fieldType: 'text',
  },
},
  {
    accessorKey: 'email',
    header: 'Email',
    meta: {
      editable: true,
      fieldType: 'text',
    } as EditableColumnMeta,
  },
    { accessorKey: 'phone', header: 'Phone ', meta: { editable: true, fieldType: 'phone' } as EditableColumnMeta },
  {
    accessorKey: 'salary',
    header: 'Salary',
    cell: ({ row }) => `$${row.original.salary}`,
    meta: {
      editable: true,
      fieldType: 'currency',
    } as EditableColumnMeta,
  },
  {
    accessorKey: 'commission',
    header: 'Commission',
    cell: ({ row }) => `${row.original.commission}%`,
    meta: {
      editable: true,
      fieldType: 'percentage',
    } as EditableColumnMeta,
  },
  {
    accessorKey: 'department',
    header: 'Department ',
    meta: {
      editable: true,
      fieldType: 'select',
      options: [
        { label: 'Engineering', value: 'Engineering' },
        { label: 'Sales', value: 'Sales' },
        { label: 'Marketing', value: 'Marketing' },
        { label: 'HR', value: 'HR' },
      ],
    } as EditableColumnMeta,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    meta: {
      editable: true,
      fieldType: 'select',
      options: [
        { label: 'Active', value: 'Active' },
        { label: 'Inactive', value: 'Inactive' },
        { label: 'On Leave', value: 'On Leave' },
      ],
    } as EditableColumnMeta,
  },
  {
    accessorKey: 'joinDate',
    header: 'Join Date ',
    meta: {
      editable: true,
      fieldType: 'date',
    } as EditableColumnMeta,
  },
  {
  id: 'actions', 
  header: 'Actions',

  cell: ({ row, table }) => {
    const meta = table.options.meta as {
      editingRowId: number | null;
      validationErrors: { field: string; message: string }[];
      onEdit: (id: number, row: Employee) => void;
      onSave: () => boolean;
      onCancel: () => void;
      onDelete: (id: number) => void;
    };

    const isEditing = meta?.editingRowId === row.original.id;
    const hasErrors = meta?.validationErrors && meta.validationErrors.length > 0;

    return (
      <div className="flex gap-2">
        {isEditing ? (
          <>
            <Button 
              size="sm" 
              className="cursor-pointer"
              onClick={() => {
                const success = meta.onSave();
                if (!success) {
                  // Validation failed, show errors
                  console.log('Validation errors:', meta.validationErrors);
                }
              }}
              disabled={hasErrors}
            >
              Save
            </Button>

            <Button size="sm" variant="outline" className="cursor-pointer" onClick={meta.onCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              size="sm"
              className="cursor-pointer"
              onClick={() =>
                meta.onEdit(row.original.id, row.original)
              }
            >
              Edit
            </Button>

            <DeleteConfirmation
              user={row.original}
              onDelete={meta.onDelete}
            >
              <Button
                size="sm"
                variant="destructive"
                className="cursor-pointer"
              >
                Delete
              </Button>
            </DeleteConfirmation>
          </>
        )}
      </div>
    );
  },
}
];