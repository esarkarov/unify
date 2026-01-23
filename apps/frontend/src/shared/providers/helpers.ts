import { RESOURCE_FILTERS, SEARCHABLE_FIELDS, STORAGE_KEY } from '@/shared/constants';
import { ApiResponse, QueryParams } from '@/shared/types';
import { AuthActionResponse, CrudFilter } from '@refinedev/core';
import { User } from 'better-auth/types';

export const getFilterField = (filter: CrudFilter): string => {
  return 'field' in filter ? filter.field : '';
};

export const buildSearchParam = (resource: string, field: string, value: unknown): string | null => {
  const searchableFields = SEARCHABLE_FIELDS[resource];
  if (!searchableFields) return null;

  return searchableFields.includes(field) ? String(value) : null;
};

export const buildFilterParams = (resource: string, filters: CrudFilter[]): QueryParams => {
  const params: QueryParams = {};

  filters.forEach((filter) => {
    const field = getFilterField(filter);
    const value = String(filter.value);

    if (field === 'role') {
      params.role = value;
      return;
    }

    const searchValue = buildSearchParam(resource, field, value);
    if (searchValue) {
      params.search = searchValue;
      return;
    }

    const resourceFilters = RESOURCE_FILTERS[resource];
    if (resourceFilters?.includes(field)) {
      params[field] = value;
    }
  });

  return params;
};

export const buildPaginationParams = (pagination?: {
  mode?: string;
  currentPage?: number;
  pageSize?: number;
}): QueryParams => {
  if (pagination?.mode === 'off') {
    return {};
  }

  return {
    page: pagination?.currentPage ?? 1,
    limit: pagination?.pageSize ?? 10,
  };
};

export const parseJsonResponse = async <T = unknown>(response: Response): Promise<ApiResponse<T>> => {
  try {
    return await response.json();
  } catch (error) {
    console.error('Failed to parse JSON response:', error);
    return {};
  }
};

export const getStoredUser = () => {
  try {
    const userJson = localStorage.getItem(STORAGE_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Failed to parse stored user:', error);
    return null;
  }
};

export const storeUser = (user: User): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to store user:', error);
  }
};

export const removeUser = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const createErrorResponse = (name: string, message: string): AuthActionResponse => ({
  success: false,
  error: { name, message },
});

export const createSuccessResponse = (redirectTo: string): AuthActionResponse => ({
  success: true,
  redirectTo,
});
