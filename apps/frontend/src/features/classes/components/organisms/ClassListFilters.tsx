import { ALL_VALUE } from '@/features/classes/constants';
import { Subject } from '@/features/subjects/types';
import { SearchInput } from '@/shared/components/molecules/SearchInput';
import { CreateButton } from '@/shared/components/refine-ui/buttons/create';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { User } from '@/shared/types';

interface ClassListFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedSubject: string;
  onSubjectChange: (value: string) => void;
  selectedTeacher: string;
  onTeacherChange: (value: string) => void;
  subjects: Subject[];
  teachers: User[];
  disabled?: boolean;
}

export const ClassListFilters = ({
  searchQuery,
  onSearchChange,
  selectedSubject,
  onSubjectChange,
  selectedTeacher,
  onTeacherChange,
  subjects,
  teachers,
  disabled = false,
}: ClassListFiltersProps) => {
  return (
    <div className="actions-row">
      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search by name..."
        disabled={disabled}
        aria-label="Search classes by name"
      />

      <div className="flex w-full gap-2 sm:w-auto">
        <Select
          value={selectedSubject}
          onValueChange={onSubjectChange}
          disabled={disabled}>
          <SelectTrigger aria-label="Filter by subject">
            <SelectValue placeholder="Filter by subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>All Subjects</SelectItem>
            {subjects.map((subject) => (
              <SelectItem
                key={subject.id}
                value={subject.name}>
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedTeacher}
          onValueChange={onTeacherChange}
          disabled={disabled}>
          <SelectTrigger aria-label="Filter by teacher">
            <SelectValue placeholder="Filter by teacher" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>All Teachers</SelectItem>
            {teachers.map((teacher) => (
              <SelectItem
                key={teacher.id}
                value={teacher.name}>
                {teacher.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <CreateButton resource="classes" />
      </div>
    </div>
  );
};
