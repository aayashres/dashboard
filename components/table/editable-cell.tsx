'use client';

import { FieldRenderer } from './field-renderer';
import { EditableColumnMeta } from '@/types/table';

interface ValidationError {
  field: string;
  message: string;
}

interface Props {
  value: string | number | boolean | unknown;
  rowId: number;
  columnId: string;
  meta: EditableColumnMeta | undefined;
  isEditing: boolean;
  setDraft: (updater: (prev: Record<string, unknown>) => Record<string, unknown>) => void;
  draft: Record<string, unknown>;
  validationErrors: ValidationError[];
}

export function EditableCell({
  value,
  columnId,
  meta,
  isEditing,
  setDraft,
  draft,
  validationErrors,
}: Props) {
  const fieldError = validationErrors?.find((error) => error.field === columnId);

  if (!isEditing || !meta?.editable) {
    return <span>{String(value || '')}</span>;
  }

  return (
    <div className="space-y-1">
      <FieldRenderer
        type={meta.fieldType || 'text'}
        value={draft[columnId] ?? value}
        options={meta.options}
        onChange={(val: string | number | boolean) =>
          setDraft((prev) => ({
            ...prev,
            [columnId]: val,
          }))
        }
      />
      {fieldError && (
        <div className="text-red-500 text-xs">
          {fieldError.message}
        </div>
      )}
    </div>
  );
}