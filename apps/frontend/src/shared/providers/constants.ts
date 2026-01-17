export const SEARCHABLE_FIELDS: Record<string, string[]> = {
  departments: ['name', 'code'],
  users: ['search', 'name', 'email'],
  subjects: ['name', 'code'],
  classes: ['name'],
} as const;

export const RESOURCE_FILTERS: Record<string, string[]> = {
  subjects: ['department'],
  classes: ['subject', 'teacher'],
} as const;
