'use client';

import { useCallback, useEffect, useState } from 'react';
import { ApiRequestError, fetchPaginated, PaginatedResponse } from '@/lib/admin/api';

interface UseAdminListOptions {
  limit?: number;
  extraParams?: Record<string, string | number | undefined>;
}

export function useAdminList<T>(endpoint: string, options: UseAdminListOptions = {}) {
  const { limit = 10, extraParams = {} } = options;
  const [data, setData] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const extraParamsKey = JSON.stringify(extraParams);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchPaginated<T>(endpoint, {
        page: currentPage,
        limit,
        search: searchTerm,
        ...extraParams,
      });
      setData(result.data);
      setTotalPages(Math.max(1, result.totalPages));
      setTotal(result.total);
    } catch (err) {
      const message =
        err instanceof ApiRequestError ? err.message : 'Erro ao carregar dados';
      setError(message);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, currentPage, limit, searchTerm, extraParamsKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return {
    data,
    currentPage,
    setCurrentPage,
    totalPages,
    total,
    searchTerm,
    handleSearch,
    isLoading,
    error,
    setError,
    refetch: fetchData,
  };
}
