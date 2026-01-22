import { BACKEND_API_URL } from '@/shared/constants';
import { buildFilterParams, buildPaginationParams, parseJsonResponse } from '@/shared/providers/helpers';
import { createDataProvider, CreateDataProviderOptions } from '@refinedev/rest';

const options: CreateDataProviderOptions = {
  getList: {
    getEndpoint: ({ resource }) => resource,

    buildQueryParams: async ({ resource, pagination, filters = [] }) => ({
      ...buildPaginationParams(pagination),
      ...buildFilterParams(resource, filters),
    }),

    mapResponse: async <T>(response: Response): Promise<T[]> => {
      const payload = await parseJsonResponse<T[]>(response);
      return (payload.data ?? []) as T[];
    },

    getTotalCount: async (response: Response): Promise<number> => {
      const payload = await parseJsonResponse<unknown[]>(response);
      return payload.pagination?.total ?? payload.data?.length ?? 0;
    },
  },

  create: {
    getEndpoint: ({ resource }) => resource,

    buildBodyParams: async ({ variables }) => variables,

    mapResponse: async <T>(response: Response): Promise<T> => {
      const payload = await parseJsonResponse<T>(response);
      return (payload.data ?? {}) as T;
    },
  },

  update: {
    getEndpoint: ({ resource, id }) => `${resource}/${id}`,

    buildBodyParams: async ({ variables }) => variables,

    mapResponse: async <T>(response: Response): Promise<T> => {
      const payload = await parseJsonResponse<T>(response);
      return (payload.data ?? {}) as T;
    },
  },

  deleteOne: {
    getEndpoint: ({ resource, id }) => `${resource}/${id}`,

    mapResponse: async <T>(response: Response): Promise<T> => {
      const payload = await parseJsonResponse<T>(response);
      return (payload.data ?? {}) as T;
    },
  },

  getOne: {
    getEndpoint: ({ resource, id }) => `${resource}/${id}`,

    mapResponse: async <T>(response: Response): Promise<T> => {
      const payload = await parseJsonResponse<T>(response);
      return (payload.data ?? {}) as T;
    },
  },

  getMany: {
    getEndpoint: ({ resource }) => resource,

    buildQueryParams: async ({ ids }) => ({
      ids: ids.join(','),
    }),

    mapResponse: async <T>(response: Response): Promise<T[]> => {
      const payload = await parseJsonResponse<T[]>(response);
      return (payload.data ?? []) as T[];
    },
  },
};

export const { dataProvider } = createDataProvider(BACKEND_API_URL, options);
