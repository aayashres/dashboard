'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Employee } from '@/types/table';

interface DeleteConfirmationProps {
  user: Employee;
  onDelete: (id: number) => void;
  children: React.ReactNode;
}

export function DeleteConfirmation({ user, onDelete, children }: DeleteConfirmationProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    onDelete(user.id);
    setShowDeleteDialog(false);
  };

  return (
    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            Are you sure you want to delete <strong>&quot;{user.name}&quot;</strong>?
            This action cannot be undone.
          </p>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={handleDelete}
            >
              Delete User
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
