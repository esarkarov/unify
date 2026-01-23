interface DetailItemProps {
  label: string;
  value: string;
  subtitle?: string;
}

export const DetailItem = ({ label, value, subtitle }: DetailItemProps) => (
  <div>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="text-base font-semibold">{value}</p>
    {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
  </div>
);
