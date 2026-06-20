'use client';

import { useState, useMemo } from 'react';
import AdminTable, { TableColumn } from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import SearchBar from '@/components/admin/SearchBar';
import Pagination from '@/components/admin/Pagination';
import { mockProcedures } from '@/lib/admin/mockData';
import { Procedure } from '@/lib/admin/types';
import { FormField } from '@/components/admin/AdminForm';

const columns: TableColumn<Procedure>[] = [
  { key: 'name', label: 'Nome', sortable: true },
  { key: 'slug', label: 'Slug', sortable: true },
  {
    key: 'createdAt',
    label: 'Criado em',
    render: (value) => new Date(value).toLocaleDateString('pt-BR'),
  },
  {
    key: 'updatedAt',
    label: 'Atualizado em',
    render: (value) => new Date(value).toLocaleDateString('pt-BR'),
  },
];

export default function ProceduresPage() {
  const [procedures, setProcedures] = useState<Procedure[]>(mockProcedures);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState({ isOpen: false, type: 'create' as 'create' | 'edit' | 'delete', data: null });
  const [formData, setFormData] = useState({ name: '', slug: '' });
  const itemsPerPage = 10;

  const filteredProcedures = useMemo(() => {
    return procedures.filter((proc) =>
      proc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proc.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [procedures, searchTerm]);

  const totalPages = Math.ceil(filteredProcedures.length / itemsPerPage);
  const paginatedProcedures = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProcedures.slice(start, start + itemsPerPage);
  }, [filteredProcedures, currentPage]);

  const openCreateModal = () => {
    setFormData({ name: '', slug: '' });
    setModal({ isOpen: true, type: 'create', data: null });
  };

  const openEditModal = (procedure: Procedure) => {
    setFormData({ name: procedure.name, slug: procedure.slug });
    setModal({ isOpen: true, type: 'edit', data: procedure });
  };

  const openDeleteModal = (procedure: Procedure) => {
    setModal({ isOpen: true, type: 'delete', data: procedure });
  };

  const handleSubmit = () => {
    if (modal.type === 'create') {
      const newProcedure: Procedure = {
        id: Math.max(...procedures.map((p) => p.id), 0) + 1,
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      setProcedures([...procedures, newProcedure]);
    } else if (modal.type === 'edit' && modal.data) {
      setProcedures(
        procedures.map((p) =>
          p.id === modal.data.id
            ? {
                ...p,
                ...formData,
                updatedAt: new Date().toISOString().split('T')[0],
              }
            : p
        )
      );
    }
    setModal({ isOpen: false, type: 'create', data: null });
  };

  const handleDelete = () => {
    if (modal.data) {
      setProcedures(procedures.filter((p) => p.id !== modal.data.id));
    }
    setModal({ isOpen: false, type: 'create', data: null });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-(--main-dark-color)">Procedimentos</h1>
        <button
          onClick={openCreateModal}
          className="px-6 py-2 bg-(--main-color) text-white rounded-lg hover:bg-(--main-light-color) transition-colors font-semibold"
        >
          + Novo Procedimento
        </button>
      </div>

      <SearchBar placeholder="Buscar por nome ou slug..." onSearch={setSearchTerm} />

      <AdminTable<Procedure>
        columns={columns}
        data={paginatedProcedures}
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

      {/* Create/Edit Modal */}
      <AdminModal
        isOpen={modal.isOpen && (modal.type === 'create' || modal.type === 'edit')}
        title={modal.type === 'create' ? 'Novo Procedimento' : 'Editar Procedimento'}
        onClose={() => setModal({ isOpen: false, type: 'create', data: null })}
        onConfirm={handleSubmit}
        confirmText={modal.type === 'create' ? 'Criar' : 'Salvar'}
      >
        <div className="space-y-4">
          <FormField
            label="Nome"
            name="name"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: String(value) })}
            required
            placeholder="Ex: Ginecologia"
          />
          <FormField
            label="Slug"
            name="slug"
            value={formData.slug}
            onChange={(value) => setFormData({ ...formData, slug: String(value) })}
            required
            placeholder="Ex: ginecologia"
          />
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
          Tem certeza que deseja excluir{' '}
          <strong>{modal.data?.name}</strong>?
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Esta ação não pode ser desfeita.
        </p>
      </AdminModal>
    </div>
  );
}
