export type FieldType =
  | "text"
  | "number"
  | "select"
  | "checkbox"
  | "date"
  | "phone"
  | "currency"
  | "percentage";

export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  salary: number;
  commission: number;
  department: string;
  status: string;
  active: boolean;
  joinDate: string;
}

export interface EditableColumnMeta {
  editable?: boolean;
  fieldType?: FieldType;
  options?: { label: string; value: string }[];
}
