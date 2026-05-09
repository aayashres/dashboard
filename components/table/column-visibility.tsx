'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Column } from '@tanstack/react-table';

interface Props<T> {
  columns: Column<T, unknown>[];
}

export function ColumnVisibility<T>({ columns }: Props<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="cursor-pointer">Columns</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {columns
          .filter((col) => col.getCanHide?.())
          .map((column) => (
            <DropdownMenuItem
              key={column.id}
              className="cursor-pointer"
              onClick={() =>
                column.toggleVisibility(!column.getIsVisible())
              }
            >
              <input
                type="checkbox"
                checked={column.getIsVisible()}
                readOnly
                className="mr-2"
              />
              {column.id}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}