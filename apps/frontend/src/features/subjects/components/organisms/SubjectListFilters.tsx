import { DepartmentFilter } from '@/features/subjects/components/molecules/DepartmentFilter';
import { SearchInput } from '@/shared/components/molecules/SearchInput';
import { CreateButton } from '@/shared/components/refine-ui/buttons/create';

interface SubjectListFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (value: string) => void;
  disabled?: boolean;
}

export const SubjectListFilters = ({
  searchQuery,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  disabled = false,
}: SubjectListFiltersProps) => {
  return (
    <div className="actions-row">
      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
        disabled={disabled}
      />

      <div className="flex w-full gap-2 sm:w-auto">
        <DepartmentFilter
          value={selectedDepartment}
          onChange={onDepartmentChange}
          disabled={disabled}
        />

        <CreateButton resource="subjects" />
      </div>
    </div>
  );
};
