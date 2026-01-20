export const getInitials = (name = ''): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '';

  const firstInitial = parts[0][0] ?? '';
  const lastInitial = parts[parts.length - 1][0] ?? '';

  return `${firstInitial}${lastInitial}`.toUpperCase();
};

export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};
