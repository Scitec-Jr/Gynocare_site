'use client';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (term: string) => void;
  onFilter?: (filter: string) => void;
}

export default function SearchBar({
  placeholder = 'Buscar...',
  onSearch,
  onFilter,
}: SearchBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--main-color)"
        />
      </div>

      {onFilter && (
        <select
          onChange={(e) => onFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--main-color)"
        >
          <option value="">Todos</option>
          <option value="active">Ativo</option>
          <option value="inactive">Inativo</option>
        </select>
      )}
    </div>
  );
}
