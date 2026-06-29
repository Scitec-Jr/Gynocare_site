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
import { Doctor } from "@/lib/admin/types";
import { formatDate } from "@/lib/admin/utils";

const columns: TableColumn<Doctor>[] = [
	{ key: "name", label: "Nome" },
	{
		key: "createdAt",
		label: "Criado em",
		render: (value) => formatDate(value),
	},
	{
		key: "updatedAt",
		label: "Atualizado em",
		render: (value) => formatDate(value),
	},
];

export default function DoctorsPage() {
	const {
		data: doctors,
		currentPage,
		setCurrentPage,
		totalPages,
		total,
		handleSearch,
		isLoading,
		error,
		setError,
		refetch,
	} = useAdminList<Doctor>("/api/doutores");

	const [modal, setModal] = useState<{
		isOpen: boolean;
		type: "create" | "edit" | "delete";
		data: Doctor | null;
	}>({ isOpen: false, type: "create", data: null });

	const [formData, setFormData] = useState({ name: "", graduation: "" });
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [successMsg, setSuccessMsg] = useState<string | null>(null);

	const closeModal = () => {
		setModal({ isOpen: false, type: "create", data: null });
		setFieldErrors({});
	};

	const openCreateModal = () => {
		setFormData({ name: "", graduation: "" });
		setFieldErrors({});
		setModal({ isOpen: true, type: "create", data: null });
	};

	const openEditModal = (doctor: Doctor) => {
		setFormData({
			name: doctor.name,
			graduation: doctor.graduation || "Médico",
		});
		setFieldErrors({});
		setModal({ isOpen: true, type: "edit", data: doctor });
	};

	const openDeleteModal = (doctor: Doctor) => {
		setModal({ isOpen: true, type: "delete", data: doctor });
	};

	const handleSubmit = async () => {
		setIsSubmitting(true);
		setFieldErrors({});
		setError(null);
		try {
			if (modal.type === "create") {
				await apiFetch("/api/doutores", {
					method: "POST",
					body: JSON.stringify(formData),
				});
				setSuccessMsg("Médico criado com sucesso!");
			} else if (modal.type === "edit" && modal.data) {
				await apiFetch(`/api/doutores/${modal.data.id}`, {
					method: "PUT",
					body: JSON.stringify(formData),
				});
				setSuccessMsg("Médico atualizado com sucesso!");
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
			await apiFetch(`/api/doutores/${modal.data.id}`, { method: "DELETE" });
			setSuccessMsg("Médico excluído com sucesso!");
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
				title="Médicos"
				total={total}
				action={{ label: "+ Novo Médico", onClick: openCreateModal }}
			/>

			{error && <AdminAlert message={error} onDismiss={() => setError(null)} />}
			{successMsg && (
				<AdminAlert
					message={successMsg}
					type="success"
					onDismiss={() => setSuccessMsg(null)}
				/>
			)}

			<SearchBar placeholder="Buscar por nome..." onSearch={handleSearch} />

			<AdminTable
				columns={columns}
				data={doctors}
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
				title={modal.type === "create" ? "Novo Médico" : "Editar Médico"}
				onClose={closeModal}
				onConfirm={handleSubmit}
				confirmText={modal.type === "create" ? "Criar" : "Salvar"}
				isLoading={isSubmitting}
			>
				<div className="space-y-1">
					<FormField
						label="Nome Completo"
						name="name"
						value={formData.name}
						onChange={(v) => setFormData({ ...formData, name: String(v) })}
						error={fieldErrors.name}
						required
						placeholder="Ex: Dra. Maria Silva"
					/>
					<FormField
						label="Especialidade / CRM"
						name="graduation"
						type="textarea"
						value={formData.graduation}
						onChange={(v) => setFormData({ ...formData, graduation: String(v) })}
						error={fieldErrors.graduation}
						required
						placeholder="Ex: Ginecologista | CRM: 12345"
						rows={2}
					/>
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
