type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ApiResponse<T = unknown> = {
  data?: T;
  pagination?: PaginationMeta;
};

export type QueryParams = Record<string, string | number>;
