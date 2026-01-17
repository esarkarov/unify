import { BACKEND_API_URL } from '@/shared/constants';
import { createDataProvider, CreateDataProviderOptions } from '@refinedev/rest';

export type ListResponse<T = unknown> = {
  data?: T[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type CreateResponse<T = unknown> = {
  data?: T;
};

export type GetOneResponse<T = unknown> = {
  data?: T;
};

const options: CreateDataProviderOptions = {
  getList: {
    getEndpoint: ({ resource }) => resource,

    buildQueryParams: async ({ resource, pagination, filters }) => {
      const params: Record<string, string | number> = {};

      if (pagination?.mode !== 'off') {
        const page = pagination?.currentPage ?? 1;
        const pageSize = pagination?.pageSize ?? 10;

        params.page = page;
        params.limit = pageSize;
      }

      filters?.forEach((filter) => {
        const field = 'field' in filter ? filter.field : '';
        const value = String(filter.value);

        if (field === 'role') {
          params.role = value;
        }

        if (resource === 'departments') {
          if (field === 'name' || field === 'code') params.search = value;
        }

        if (resource === 'users') {
          if (field === 'search' || field === 'name' || field === 'email') {
            params.search = value;
          }
        }

        if (resource === 'subjects') {
          if (field === 'department') params.department = value;
          if (field === 'name' || field === 'code') params.search = value;
        }

        if (resource === 'classes') {
          if (field === 'name') params.search = value;
          if (field === 'subject') params.subject = value;
          if (field === 'teacher') params.teacher = value;
        }
      });

      return params;
    },

    mapResponse: async (response) => {
      const payload: ListResponse = await response.json();
      return payload.data ?? [];
    },

    getTotalCount: async (response) => {
      const payload: ListResponse = await response.json();
      return payload.pagination?.total ?? payload.data?.length ?? 0;
    },
  },
};

const { dataProvider } = createDataProvider(BACKEND_API_URL, options);

export { dataProvider };
