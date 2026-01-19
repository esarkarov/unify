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

export const STORAGE_KEY = 'user' as const;

export const ERROR_MESSAGES = {
  REGISTER_FAILED: 'Unable to create account. Please try again.',
  LOGIN_FAILED: 'Please try again later.',
  LOGOUT_FAILED: 'Unable to log out. Please try again.',
  UNAUTHORIZED: 'Check failed',
} as const;
