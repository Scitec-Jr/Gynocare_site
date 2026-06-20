'use client';

import { useState, useMemo } from 'react';
import AdminTable, { TableColumn } from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import SearchBar from '@/components/admin/SearchBar';
import Pagination from '@/components/admin/Pagination';
import { mockReviews } from '@/lib/admin/mockData';
import { Review } from '@/lib/admin/types';
import { FormField } from '@/components/admin/AdminForm';

const columns: TableColumn<Review>[] = [
  {
    key: 'rating',
    label: 'Avaliação',
    render: (value) => `${'⭐'.repeat(value)} (${value}/5)`,
  },
  {
    key: 'text',
    label: 'Comentário',
    render: (value) => (value ? value.substring(0, 50) + '...' : 'Sem comentário'),
  },
  {
    key: 'status',
    label: 'Status',
    render: (value) => (
      <span className={`px-3 py-1 rounded text-sm font-semibold ${
        value ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
      }`}>
        {value ? 'Publicada' : 'Pendente'}
      </span>
    ),
  },
  {
    key: 'createdAt',
    label: 'Data',
    render: (value) => new Date(value).toLocaleDateString('pt-BR'),
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState({ isOpen: false, type: 'create' as 'create' | 'edit' | 'delete' | 'view', data: null });
  const [formData, setFormData] = useState({ rating: 5, text: '', status: true });
  const itemsPerPage = 10;

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) =>
      review.text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      searchTerm === '' ||
      searchTerm === 'publicada' && review.status ||
      searchTerm === 'pendente' && !review.status
    );
  }, [reviews, searchTerm]);

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const paginatedReviews = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredReviews.slice(start, start + itemsPerPage);
  }, [filteredReviews, currentPage]);

  const openViewModal = (review: Review) => {
    setFormData({ rating: review.rating, text: review.text || '', status: review.status });
    setModal({ isOpen: true, type: 'view', data: review });
  };

  const openEditModal = (review: Review) => {
    setFormData({ rating: review.rating, text: review.text || '', status: review.status });
    setModal({ isOpen: true, type: 'edit', data: review });
  };

  const openDeleteModal = (review: Review) => {
    setModal({ isOpen: true, type: 'delete', data: review });
  };

  const handleSubmit = () => {
    if (modal.type === 'edit' && modal.data) {
      setReviews(
        reviews.map((r) =>
          r.id === modal.data.id
            ? {
                ...r,
                ...formData,
                updatedAt: new Date().toISOString().split('T')[0],
              }
            : r
        )
      );
    }
    setModal({ isOpen: false, type: 'create', data: null });
  };

  const handleDelete = () => {
    if (modal.data) {
      setReviews(reviews.filter((r) => r.id !== modal.data.id));
    }
    setModal({ isOpen: false, type: 'create', data: null });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-(--main-dark-color)">Avaliações</h1>
      </div>

      <SearchBar placeholder="Buscar por comentário ou status..." onSearch={setSearchTerm} />

      <AdminTable<Review>
        columns={columns}
        data={paginatedReviews}
        onView={openViewModal}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* View Modal */}
      <AdminModal
        isOpen={modal.isOpen && modal.type === 'view'}
        title="Visualizar Avaliação"
        onClose={() => setModal({ isOpen: false, type: 'create', data: null })}
      >
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Avaliação</p>
            <p className="text-2xl">{'⭐'.repeat(formData.rating)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Comentário</p>
            <p className="text-gray-800">{formData.text || 'Sem comentário'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Status</p>
            <p className="text-gray-800">{formData.status ? 'Publicada' : 'Pendente'}</p>
          </div>
        </div>
      </AdminModal>

      {/* Edit Modal */}
      <AdminModal
        isOpen={modal.isOpen && modal.type === 'edit'}
        title="Editar Avaliação"
        onClose={() => setModal({ isOpen: false, type: 'create', data: null })}
        onConfirm={handleSubmit}
        confirmText="Salvar"
      >
        <div className="space-y-4">
          <FormField
            label="Avaliação"
            name="rating"
            type="number"
            value={formData.rating}
            onChange={(value) => setFormData({ ...formData, rating: Math.min(5, Math.max(1, Number(value))) })}
          />
          <FormField
            label="Comentário"
            name="text"
            type="textarea"
            value={formData.text}
            onChange={(value) => setFormData({ ...formData, text: String(value) })}
            rows={3}
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="status"
              checked={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="status" className="text-sm font-medium text-gray-700">
              Publicar avaliação
            </label>
          </div>
        </div>
      </AdminModal>

      {/* Delete Modal */}
      <AdminModal
        isOpen={modal.isOpen && modal.type === 'delete'}
        title="Confirmar Exclusão"
        onClose={() => setModal({ isOpen: false, type: 'create', data: null })}
        onConfirm={handleDelete}
        confirmText="Excluir"
        type="danger"
      >
        <p className="text-gray-700">
          Tem certeza que deseja excluir esta avaliação?
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Esta ação não pode ser desfeita.
        </p>
      </AdminModal>
    </div>
  );
}
