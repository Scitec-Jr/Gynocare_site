'use client';

import { ReactNode } from 'react';

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: any, item: T) => ReactNode;
  width?: string;
}

interface AdminTableProps<T extends { id: number }> {
  columns: TableColumn<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  actions?: boolean;
  isLoading?: boolean;
}

export default function AdminTable<T extends { id: number }>({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  actions = true,
  isLoading = false,
}: AdminTableProps<T>) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="inline-block w-10 h-10 border-3 border-gray-200 border-t-(--main-color) rounded-full animate-spin" />
            <p className="mt-4 text-gray-500 text-sm">Carregando dados...</p>
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="text-center py-16 px-4">
          <p className="text-gray-400 text-4xl mb-3">📋</p>
          <p className="text-gray-600 font-medium">Nenhum registro encontrado</p>
          <p className="text-gray-400 text-sm mt-1">
            Tente ajustar a busca ou adicionar um novo registro
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${column.width || ''}`}
                >
                  {column.label}
                </th>
              ))}
              {actions && (
                <th className="px-5 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50/80 transition-colors"
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className="px-5 py-4 text-sm text-gray-700"
                  >
                    {column.render
                      ? column.render(item[column.key], item)
                      : String(item[column.key] ?? '—')}
                  </td>
                ))}
                {actions && (
                  <td className="px-5 py-4 text-sm text-right">
                    <div className="flex gap-1.5 justify-end">
                      {onView && (
                        <button
                          onClick={() => onView(item)}
                          className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                        >
                          Ver
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 rounded-md hover:bg-amber-100 transition-colors"
                        >
                          Editar
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item)}
                          className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                        >
                          Excluir
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
