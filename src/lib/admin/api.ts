export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiFieldError {
  field: string;
  message: string;
}

export class ApiRequestError extends Error {
  status: number;
  fieldErrors: Record<string, string>;

  constructor(
    message: string,
    status: number = 500,
    fieldErrors: Record<string, string> = {},
  ) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

export function buildQuery(params: Record<string, string | number | undefined>) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      search.set(key, String(value));
    }
  });
  return search.toString();
}

export async function apiFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const fieldErrors: Record<string, string> = {};
    if (Array.isArray(data.errors)) {
      data.errors.forEach((e: ApiFieldError) => {
        fieldErrors[e.field] = e.message;
      });
    }
    const message =
      data.errors?.[0]?.message ||
      data.error ||
      'Erro inesperado. Tente novamente.';
    throw new ApiRequestError(message, res.status, fieldErrors);
  }

  return data as T;
}

export async function fetchPaginated<T>(
  endpoint: string,
  params: Record<string, string | number | undefined> = {},
): Promise<PaginatedResponse<T>> {
  const query = buildQuery(params);
  return apiFetch<PaginatedResponse<T>>(`${endpoint}?${query}`);
}

export async function fetchAll<T>(
  endpoint: string,
  extraParams: Record<string, string | number | undefined> = {},
): Promise<T[]> {
  const result = await fetchPaginated<T>(endpoint, {
    page: 1,
    limit: 200,
    ...extraParams,
  });
  return result.data;
}
