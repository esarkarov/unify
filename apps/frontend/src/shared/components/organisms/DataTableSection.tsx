import { InfoCard } from '@/shared/components/organisms/InfoCard';
import { DataTable } from '@/shared/components/refine-ui/data-table/data-table';
import { Badge } from '@/shared/components/ui/badge';
import { BaseRecord, HttpError } from '@refinedev/core';
import { UseTableReturnType } from '@refinedev/react-table';

interface DataTableSectionProps<T extends BaseRecord> {
  title: string;
  table: UseTableReturnType<T, HttpError>;
  count?: number;
  className?: string;
}

export const DataTableSection = <T extends BaseRecord>({
  title,
  table,
  count,
  className,
}: DataTableSectionProps<T>) => {
  return (
    <InfoCard
      title={title}
      badge={count !== undefined ? <Badge variant="secondary">{count}</Badge> : undefined}
      className={className}>
      <DataTable table={table} />
    </InfoCard>
  );
};
