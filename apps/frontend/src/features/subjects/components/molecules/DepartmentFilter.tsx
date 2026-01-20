import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { ALL_DEPARTMENTS, DEPARTMENT_OPTIONS } from '@/features/subjects/constants';

interface DepartmentFilterProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const DepartmentFilter = ({ value, onChange, disabled = false }: DepartmentFilterProps) => {
  return (
    <Select
      value={value}
      onValueChange={onChange}
      disabled={disabled}>
      <SelectTrigger aria-label="Filter by department">
        <SelectValue placeholder="Filter by department" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value={ALL_DEPARTMENTS}>All Departments</SelectItem>
        {DEPARTMENT_OPTIONS.map((department) => (
          <SelectItem
            key={department.value}
            value={department.value}>
            {department.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
