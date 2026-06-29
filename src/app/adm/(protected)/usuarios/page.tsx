"use client";

import { useState } from "react";
import AdminTable, { TableColumn } from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import AdminAlert from "@/components/admin/AdminAlert";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import SearchBar from "@/components/admin/SearchBar";
import Pagination from "@/components/admin/Pagination";
import { FormField } from "@/components/admin/AdminForm";
import { useAdminList } from "@/hooks/useAdminList";
import { apiFetch, ApiRequestError } from "@/lib/admin/api";
import { User } from "@/lib/admin/types";
import { formatDate } from "@/lib/admin/utils";

const roleLabels: Record<string, string> = {
	admin: "Administrador",
	doctor: "Médico",
	secretary: "Secretária",
};

const columns: TableColumn<User>[] = [
	{ key: "name", label: "Nome" },
	{ key: "email", label: "Email" },
	{
		key: "role",
		label: "Função",
		render: (value) => roleLabels[value] || value,
	},
	{
		key: "status",
		label: "Status",
		render: (value) => (
			<span
				className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
					value
						? "bg-green-100 text-green-700"
						: "bg-red-100 text-red-700"
				}`}
			>
				{value ? "Ativo" : "Inativo"}
			</span>
		),
	},
	{
		key: "createdAt",
		label: "Criado em",
		render: (value) => formatDate(value),
	},
];

export default function UsersPage() {
	const {
		data: users,
		currentPage,
		setCurrentPage,
		totalPages,
		total,
		handleSearch,
		isLoading,
		error,
		setError,
		refetch,
	} = useAdminList<User>("/api/usuarios");

	const [modal, setModal] = useState<{
		isOpen: boolean;
		type: "create" | "edit" | "delete";
		data: User | null;
	}>({ isOpen: false, type: "create", data: null });

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		role: "secretary" as "admin" | "doctor" | "secretary",
		status: true,
	});
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [successMsg, setSuccessMsg] = useState<string | null>(null);

	const closeModal = () => {
		setModal({ isOpen: false, type: "create", data: null });
		setFieldErrors({});
	};

	const openCreateModal = () => {
		setFormData({
			name: "",
			email: "",
			password: "",
			role: "secretary",
			status: true,
		});
		setFieldErrors({});
		setModal({ isOpen: true, type: "create", data: null });
	};

	const openEditModal = (user: User) => {
		setFormData({
			name: user.name,
			email: user.email,
			password: "",
			role: user.role,
			status: user.status,
		});
		setFieldErrors({});
		setModal({ isOpen: true, type: "edit", data: user });
	};

	const openDeleteModal = (user: User) => {
		setModal({ isOpen: true, type: "delete", data: user });
	};

	const handleSubmit = async () => {
		setIsSubmitting(true);
		setFieldErrors({});
		setError(null);
		try {
			if (modal.type === "create") {
				await apiFetch("/api/usuarios", {
					method: "POST",
					body: JSON.stringify(formData),
				});
				setSuccessMsg("Usuário criado com sucesso!");
			} else if (modal.type === "edit" && modal.data) {
				const payload: Record<string, unknown> = {
					name: formData.name,
					email: formData.email,
					role: formData.role,
					status: formData.status,
				};
				if (formData.password) {
					payload.password = formData.password;
				}
				await apiFetch(`/api/usuarios/${modal.data.id}`, {
					method: "PUT",
					body: JSON.stringify(payload),
				});
				setSuccessMsg("Usuário atualizado com sucesso!");
			}
			closeModal();
			refetch();
		} catch (err) {
			if (err instanceof ApiRequestError) {
				setFieldErrors(err.fieldErrors);
				setError(err.message);
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDelete = async () => {
		if (!modal.data) return;
		setIsSubmitting(true);
		setError(null);
		try {
			await apiFetch(`/api/usuarios/${modal.data.id}`, { method: "DELETE" });
			setSuccessMsg("Usuário excluído com sucesso!");
			closeModal();
			refetch();
		} catch (err) {
			if (err instanceof ApiRequestError) setError(err.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div>
			<AdminPageHeader
				title="Usuários"
				total={total}
				action={{ label: "+ Novo Usuário", onClick: openCreateModal }}
			/>

			{error && <AdminAlert message={error} onDismiss={() => setError(null)} />}
			{successMsg && (
				<AdminAlert
					message={successMsg}
					type="success"
					onDismiss={() => setSuccessMsg(null)}
				/>
			)}

			<SearchBar placeholder="Buscar por nome ou email..." onSearch={handleSearch} />

			<AdminTable
				columns={columns}
				data={users}
				onEdit={openEditModal}
				onDelete={openDeleteModal}
				isLoading={isLoading}
			/>

			{totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={setCurrentPage}
				/>
			)}

			<AdminModal
				isOpen={modal.isOpen && (modal.type === "create" || modal.type === "edit")}
				title={modal.type === "create" ? "Novo Usuário" : "Editar Usuário"}
				onClose={closeModal}
				onConfirm={handleSubmit}
				confirmText={modal.type === "create" ? "Criar" : "Salvar"}
				isLoading={isSubmitting}
				size="lg"
			>
				<div className="space-y-1">
					<FormField
						label="Nome Completo"
						name="name"
						value={formData.name}
						onChange={(v) => setFormData({ ...formData, name: String(v) })}
						error={fieldErrors.name}
						required
						placeholder="Ex: João Silva"
					/>
					<FormField
						label="Email"
						name="email"
						type="email"
						value={formData.email}
						onChange={(v) => setFormData({ ...formData, email: String(v) })}
						error={fieldErrors.email}
						required
						placeholder="Ex: joao@gynocare.com.br"
					/>
					<FormField
						label={
							modal.type === "create"
								? "Senha"
								: "Nova Senha (deixe em branco para manter)"
						}
						name="password"
						type="password"
						value={formData.password}
						onChange={(v) => setFormData({ ...formData, password: String(v) })}
						error={fieldErrors.password}
						required={modal.type === "create"}
						placeholder="Mínimo 6 caracteres"
					/>
					<FormField
						label="Função"
						name="role"
						type="select"
						value={formData.role}
						onChange={(v) =>
							setFormData({
								...formData,
								role: v as "admin" | "doctor" | "secretary",
							})
						}
						error={fieldErrors.role}
						options={[
							{ label: "Administrador", value: "admin" },
							{ label: "Médico", value: "doctor" },
							{ label: "Secretária", value: "secretary" },
						]}
					/>
					<label className="flex items-center gap-2 mt-2 cursor-pointer">
						<input
							type="checkbox"
							checked={formData.status}
							onChange={(e) =>
								setFormData({ ...formData, status: e.target.checked })
							}
							className="w-4 h-4 rounded border-gray-300 text-(--main-color) focus:ring-(--main-color)"
						/>
						<span className="text-sm font-medium text-gray-700">
							Usuário ativo
						</span>
					</label>
				</div>
			</AdminModal>

			<AdminModal
				isOpen={modal.isOpen && modal.type === "delete"}
				title="Confirmar Exclusão"
				onClose={closeModal}
				onConfirm={handleDelete}
				confirmText="Excluir"
				type="danger"
				isLoading={isSubmitting}
			>
				<p className="text-gray-700">
					Tem certeza que deseja excluir <strong>{modal.data?.name}</strong>?
				</p>
				<p className="text-sm text-gray-500 mt-2">Esta ação não pode ser desfeita.</p>
			</AdminModal>
		</div>
	);
}
