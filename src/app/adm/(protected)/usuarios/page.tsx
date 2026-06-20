'use client';

import { useState, useMemo } from 'react';
import AdminTable, { TableColumn } from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import SearchBar from '@/components/admin/SearchBar';
import Pagination from '@/components/admin/Pagination';
import { mockUsers } from '@/lib/admin/mockData';
import { User } from '@/lib/admin/types';
import { FormField } from '@/components/admin/AdminForm';

const columns: TableColumn<User>[] = [
  { key: 'name', label: 'Nome', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  {
    key: 'role',
    label: 'Função',
    render: (value) => {
      const roles: Record<string, string> = {
        admin: 'Administrador',
        doctor: 'Médico',
        secretary: 'Secretária',
      };
      return roles[value] || value;
    },
  },
  {
    key: 'status',
    label: 'Status',
    render: (value) => (
      <span className={`px-3 py-1 rounded text-sm font-semibold ${
        value ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}>
        {value ? 'Ativo' : 'Inativo'}
      </span>
    ),
  },
  {
    key: 'createdAt',
    label: 'Criado em',
    render: (value) => new Date(value).toLocaleDateString('pt-BR'),
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState({ isOpen: false, type: 'create' as 'create' | 'edit' | 'delete', data: null });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'doctor' as 'admin' | 'doctor' | 'secretary',
    status: true,
  });
  const itemsPerPage = 10;

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const openCreateModal = () => {
    setFormData({
      name: '',
      email: '',
      role: 'doctor',
      status: true,
    });
    setModal({ isOpen: true, type: 'create', data: null });
  };

  const openEditModal = (user: User) => {
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setModal({ isOpen: true, type: 'edit', data: user });
  };

  const openDeleteModal = (user: User) => {
    setModal({ isOpen: true, type: 'delete', data: user });
  };

  const handleSubmit = () => {
    if (modal.type === 'create') {
      const newUser: User = {
        id: Math.max(...users.map((u) => u.id), 0) + 1,
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      setUsers([...users, newUser]);
    } else if (modal.type === 'edit' && modal.data) {
      setUsers(
        users.map((u) =>
          u.id === modal.data.id
            ? {
                ...u,
                ...formData,
                updatedAt: new Date().toISOString().split('T')[0],
              }
            : u
        )
      );
    }
    setModal({ isOpen: false, type: 'create', data: null });
  };

  const handleDelete = () => {
    if (modal.data) {
      setUsers(users.filter((u) => u.id !== modal.data.id));
    }
    setModal({ isOpen: false, type: 'create', data: null });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-(--main-dark-color)">Usuários</h1>
        <button
          onClick={openCreateModal}
          className="px-6 py-2 bg-(--main-color) text-white rounded-lg hover:bg-(--main-light-color) transition-colors font-semibold"
        >
          + Novo Usuário
        </button>
      </div>

      <SearchBar placeholder="Buscar por nome ou email..." onSearch={setSearchTerm} />

      <AdminTable<User>
        columns={columns}
        data={paginatedUsers}
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
        title={modal.type === 'create' ? 'Novo Usuário' : 'Editar Usuário'}
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
            placeholder="Ex: João Silva"
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: String(value) })}
            required
            placeholder="Ex: joao@gynocare.com.br"
          />
          <FormField
            label="Função"
            name="role"
            type="select"
            value={formData.role}
            onChange={(value) => setFormData({ ...formData, role: value as 'admin' | 'doctor' | 'secretary' })}
            options={[
              { label: 'Administrador', value: 'admin' },
              { label: 'Médico', value: 'doctor' },
              { label: 'Secretária', value: 'secretary' },
            ]}
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
              Usuário ativo
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
