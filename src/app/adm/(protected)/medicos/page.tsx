'use client';

import { useState, useMemo } from 'react';
import AdminTable, { TableColumn } from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import AdminForm, { FormField } from '@/components/admin/AdminForm';
import SearchBar from '@/components/admin/SearchBar';
import Pagination from '@/components/admin/Pagination';
import { mockDoctors } from '@/lib/admin/mockData';
import { Doctor } from '@/lib/admin/types';

const columns: TableColumn<Doctor>[] = [
  { key: 'name', label: 'Nome', sortable: true },
  { key: 'graduation', label: 'Especialidade', sortable: true },
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

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState({ isOpen: false, type: 'create' as 'create' | 'edit' | 'delete', data: null });
  const [formData, setFormData] = useState({ name: '', graduation: '' });
  const itemsPerPage = 10;

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.graduation.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [doctors, searchTerm]);

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const paginatedDoctors = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredDoctors.slice(start, start + itemsPerPage);
  }, [filteredDoctors, currentPage]);

  const openCreateModal = () => {
    setFormData({ name: '', graduation: '' });
    setModal({ isOpen: true, type: 'create', data: null });
  };

  const openEditModal = (doctor: Doctor) => {
    setFormData({ name: doctor.name, graduation: doctor.graduation });
    setModal({ isOpen: true, type: 'edit', data: doctor });
  };

  const openDeleteModal = (doctor: Doctor) => {
    setModal({ isOpen: true, type: 'delete', data: doctor });
  };

  const handleSubmit = () => {
    if (modal.type === 'create') {
      const newDoctor: Doctor = {
        id: Math.max(...doctors.map((d) => d.id), 0) + 1,
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      setDoctors([...doctors, newDoctor]);
    } else if (modal.type === 'edit' && modal.data) {
      setDoctors(
        doctors.map((d) =>
          d.id === modal.data.id
            ? {
                ...d,
                ...formData,
                updatedAt: new Date().toISOString().split('T')[0],
              }
            : d
        )
      );
    }
    setModal({ isOpen: false, type: 'create', data: null });
  };

  const handleDelete = () => {
    if (modal.data) {
      setDoctors(doctors.filter((d) => d.id !== modal.data.id));
    }
    setModal({ isOpen: false, type: 'create', data: null });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-(--main-dark-color)">Médicos</h1>
        <button
          onClick={openCreateModal}
          className="px-6 py-2 bg-(--main-color) text-white rounded-lg hover:bg-(--main-light-color) transition-colors font-semibold"
        >
          + Novo Médico
        </button>
      </div>

      <SearchBar placeholder="Buscar por nome ou especialidade..." onSearch={setSearchTerm} />

      <AdminTable<Doctor>
        columns={columns}
        data={paginatedDoctors}
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
        title={modal.type === 'create' ? 'Novo Médico' : 'Editar Médico'}
        onClose={() => setModal({ isOpen: false, type: 'create', data: null })}
        onConfirm={handleSubmit}
        confirmText={modal.type === 'create' ? 'Criar' : 'Salvar'}
      >
        <div className="space-y-4">
          <FormField
            label="Nome Completo"
            name="name"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: String(value) })}
            required
            placeholder="Ex: Dra. Maria Silva"
          />
          <FormField
            label="Especialidade / CRM"
            name="graduation"
            type="textarea"
            value={formData.graduation}
            onChange={(value) => setFormData({ ...formData, graduation: String(value) })}
            required
            placeholder="Ex: Ginecologista | CRM: 12345"
            rows={3}
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
