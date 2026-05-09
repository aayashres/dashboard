'use client';

import { Button } from '@/components/ui/button';
import { Table } from '@tanstack/react-table';

export function TablePagination<T>({ table }: { table: Table<T> }) {
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  return (
    <div className="flex items-center justify-between mt-4">

      {/* LEFT - Info */}
      <div className="text-sm text-muted-foreground">
        Page {currentPage + 1} of {pageCount}
      </div>

      {/* CENTER - Page Numbers */}
      <div className="flex gap-2">
        {Array.from({ length: pageCount }, (_, i) => (
          <Button
            key={i}
            variant={currentPage === i ? 'default' : 'outline'}
            size="sm"
            onClick={() =>
              table.setPageIndex(i)
            }
          >
            {i + 1}
          </Button>
        ))}
      </div>

      {/* RIGHT - Navigation */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}