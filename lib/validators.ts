import { z } from 'zod';

// Employee validation schema
export const employeeSchema = z.object({
  id: z.number(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^\d+$/, 'Phone must contain only numbers').optional(),
  salary: z.number().positive('Salary must be a positive number').optional(),
  commission: z.number().min(0, 'Commission must be non-negative').max(100, 'Commission cannot exceed 100%').optional(),
  department: z.enum(['Engineering', 'Sales', 'Marketing', 'Support']),
  status: z.enum(['Active', 'Inactive', 'On Leave']),
  active: z.boolean(),
  joinDate: z.string(),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;

// Validation functions for different contexts
export const validateEmployeeField = (field: keyof EmployeeFormData, value: unknown): string | null => {
  try {
    const fieldSchema = employeeSchema.pick({ [field]: true } as Record<keyof EmployeeFormData, true>);
    const result = fieldSchema.safeParse({ [field]: value });
    return result.success ? null : result.error.issues[0]?.message || 'Validation failed';
  } catch {
    return 'Validation error';
  }
};

export const validateEmployeeForm = (data: Partial<EmployeeFormData>): { isValid: boolean; errors: Record<string, string> } => {
  const result = employeeSchema.safeParse(data);
  
  if (result.success) {
    return { isValid: true, errors: {} };
  }
  
  const errors: Record<string, string> = {};
  result.error.issues.forEach((error) => {
    if (error.path.length > 0) {
      errors[String(error.path[0])] = error.message;
    }
  });
  
  return { isValid: false, errors };
};
