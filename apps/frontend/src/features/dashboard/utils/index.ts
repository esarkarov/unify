export function getTopItems<T>(items: T[], sortKey: keyof T, limit: number = 5): T[] {
  return [...items]
    .sort((a, b) => {
      const aVal = Number(a[sortKey]) || 0;
      const bVal = Number(b[sortKey]) || 0;
      return bVal - aVal;
    })
    .slice(0, limit);
}
