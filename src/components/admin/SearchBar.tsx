'use client';

import { useEffect, useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (term: string) => void;
  onFilter?: (filter: string) => void;
  filterOptions?: Array<{ label: string; value: string }>;
  filterLabel?: string;
}

export default function SearchBar({
  placeholder = 'Buscar...',
  onSearch,
  onFilter,
  filterOptions,
  filterLabel = 'Filtrar',
}: SearchBarProps) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => onSearch(value), 350);
    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="flex-1 relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-(--main-color)/30 focus:border-(--main-color) transition-colors"
        />
      </div>

      {onFilter && filterOptions && (
        <select
          onChange={(e) => onFilter(e.target.value)}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-(--main-color)/30 focus:border-(--main-color)"
          aria-label={filterLabel}
        >
          {filterOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
