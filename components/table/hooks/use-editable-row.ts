"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

interface ValidationError {
  field: string;
  message: string;
}

export function useEditableRow<T extends { id: number }>(initialData: T[]) {
  const [data, setData] = useState(initialData);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [draftRow, setDraftRow] = useState<Partial<T>>({});
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  const validateField = (field: string, value: string | number | boolean | undefined): string | null => {
    switch (field) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(String(value))) {
          return 'Invalid email format';
        }
        break;
      case 'phone':
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (value && !phoneRegex.test(String(value))) {
          return 'Phone number can only contain digits, spaces, and +()-';
        }
        if (value && String(value).replace(/\D/g, '').length < 10) {
          return 'Phone number must have at least 10 digits';
        }
        break;
      case 'salary':
      case 'commission':
        const numValue = Number(value);
        if (isNaN(numValue) || numValue < 0) {
          return 'Must be a positive number';
        }
        break;
    }
    return null;
  };

  const validateDraft = (): boolean => {
    const errors: ValidationError[] = [];
    
    Object.entries(draftRow).forEach(([field, value]) => {
      const error = validateField(field, value);
      if (error) {
        errors.push({ field, message: error });
      }
    });

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const validateDraftOnly = useCallback((): ValidationError[] => {
    const errors: ValidationError[] = [];
    
    Object.entries(draftRow).forEach(([field, value]) => {
      const error = validateField(field, value);
      if (error) {
        errors.push({ field, message: error });
      }
    });

    return errors;
  }, [draftRow]);

  const startEdit = (id: number, row: T) => {
    setEditingRowId(id);
    setDraftRow(row);
    setValidationErrors([]);
  };

  const cancelEdit = () => {
    setEditingRowId(null);
    setDraftRow({});
    setValidationErrors([]);
  };

  // Re-validate whenever draft data changes during editing
  useEffect(() => {
    if (editingRowId !== null && Object.keys(draftRow).length > 0) {
      const errors = validateDraftOnly();
      // Defer state update to avoid synchronous setState warning
      setTimeout(() => setValidationErrors(errors), 0);
    }
  }, [draftRow, editingRowId, validateDraftOnly]);

  const saveEdit = () => {
    if (!validateDraft()) {
      return false; // Validation failed
    }

    const updatedRow = { ...data.find(row => row.id === editingRowId), ...draftRow } as T;
    
    setData((prev) =>
      prev.map((row: T) =>
        row.id === editingRowId ? { ...row, ...draftRow } : row,
      ),
    );

    // Show toast notification for successful edit
    if (updatedRow && 'name' in updatedRow) {
      toast.success(`User "${updatedRow.name}" has been updated successfully!`);
    }

    cancelEdit();
    return true; // Save successful
  };

  return {
    data,
    setData,
    editingRowId,
    draftRow,
    setDraftRow,
    validationErrors,
    startEdit,
    cancelEdit,
    saveEdit,
    validateField,
  };
}
