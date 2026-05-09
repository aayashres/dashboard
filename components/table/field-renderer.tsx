"use client";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  type: string;
  value: unknown;
  options?: { label: string; value: string }[];
  onChange: (value: string | number | boolean) => void;
}

export function FieldRenderer({ type, value, options, onChange }: Props) {
  switch (type) {
    case "text":
      return (
        <Input
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "number":
      return (
        <Input
          type="number"
          value={String(value)}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      );

    case "select":
      return (
        <Select value={String(value)} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "checkbox":
      return <Switch checked={Boolean(value)} onCheckedChange={onChange} />;

    case "date":
      return (
        <Input
          type="date"
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "phone":
      return (
        <Input
          type="tel"
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          placeholder="(555) 123-4567"
        />
      );

    case "currency":
      return (
        <Input
          type="text"
          value={String(value)}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/[^0-9.]/g, '');
            onChange(numericValue ? Number(numericValue) : 0);
          }}
          placeholder="$0.00"
        />
      );

    case "percentage":
      return (
        <Input
          type="text"
          value={String(value)}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/[^0-9.]/g, '');
            onChange(numericValue ? Number(numericValue) : 0);
          }}
          placeholder="0%"
        />
      );

    default:
      return (
        <Input
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
}
