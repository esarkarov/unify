import { Input } from '@/shared/components/ui/input';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  'aria-label'?: string;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search...',
  disabled = false,
  'aria-label': ariaLabel,
}: SearchInputProps) => {
  return (
    <div className="search-field">
      <Search
        className="search-icon"
        aria-hidden="true"
      />
      <Input
        type="search"
        placeholder={placeholder}
        className="w-full pl-10"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        aria-label={ariaLabel ?? placeholder}
      />
    </div>
  );
};
