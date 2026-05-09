'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Employee } from '@/types/table';
import { validateEmployeeForm, EmployeeFormData } from '@/lib/validators';

interface AddUserProps {
  onAdd: (employee: Employee) => void;
}

export function AddUser({ onAdd }: AddUserProps) {
  const [open, setOpen] = useState(false);

  const departments = ['Engineering', 'Sales', 'Marketing', 'Support'];

  const [form, setForm] = useState<Partial<EmployeeFormData>>({
    name: '',
    email: '',
    phone: '',
    salary: 0,
    commission: 0,
    department: 'Engineering',
  });

  const [errors, setErrors] = useState<Record<string, string>>({
    name: '',
    email: '',
    phone: '',
    salary: '',
    commission: '',
    department: '',
  });

  const handleChange = (key: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear error for this field when user starts typing
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const handleSubmit = () => {
    const validation = validateEmployeeForm(form);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const newUser: Employee = {
      id: Date.now(),
      name: form.name || '',
      email: form.email || '',
      phone: form.phone || '',
      salary: form.salary || 0,
      commission: form.commission || 0,
      department: form.department || 'Engineering',
      status: 'Active',
      active: true,
      joinDate: new Date().toISOString().split('T')[0],
    };

    onAdd(newUser);
    toast.success(`User "${form.name}" has been added successfully!`);

    setForm({
      name: '',
      email: '',
      phone: '',
      salary: 0,
      commission: 0,
      department: 'Engineering',
      status: 'Active',
      active: true,
      joinDate: new Date().toISOString().split('T')[0],
    });

    setErrors({
      name: '',
      email: '',
      phone: '',
      salary: '',
      commission: '',
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Add User</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-1">
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          <div className="space-y-1">
            <Input
              placeholder="Email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-1">
            <Input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          </div>

          <div className="space-y-1">
            <Input
              placeholder="Salary"
              type="number"
              value={form.salary}
              onChange={(e) => handleChange('salary', Number(e.target.value))}
            />
            {errors.salary && <p className="text-sm text-red-500">{errors.salary}</p>}
          </div>

          <div className="space-y-1">
            <Input
              placeholder="Commission"
              type="number"
              value={form.commission}
              onChange={(e) => handleChange('commission', Number(e.target.value))}
            />
            {errors.commission && <p className="text-sm text-red-500">{errors.commission}</p>}
          </div>

          <Select
            value={form.department}
            onValueChange={(value) => handleChange('department', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((department) => (
                <SelectItem key={department} value={department}>
                  {department}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button className="w-full cursor-pointer" onClick={handleSubmit}>
            Create User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}