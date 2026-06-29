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
import { Procedure } from "@/lib/admin/types";
import { formatDate, generateSlug } from "@/lib/admin/utils";

const columns: TableColumn<Procedure>[] = [
	{ key: "name", label: "Nome" },
	{
		key: "slug",
		label: "Slug",
		render: (value) => (
			<span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{value}</span>
		),
	},
	{
		key: "createdAt",
		label: "Criado em",
		render: (value) => formatDate(value),
	},
];

export default function ProceduresPage() {
	const {
		data: procedures,
		currentPage,
		setCurrentPage,
		totalPages,
		total,
		handleSearch,
		isLoading,
		error,
		setError,
		refetch,
	} = useAdminList<Procedure>("/api/procedimentos");

	const [modal, setModal] = useState<{
		isOpen: boolean;
		type: "create" | "edit" | "delete";
		data: Procedure | null;
	}>({ isOpen: false, type: "create", data: null });

	const [formData, setFormData] = useState({ name: "", slug: "" });
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [successMsg, setSuccessMsg] = useState<string | null>(null);

	const closeModal = () => {
		setModal({ isOpen: false, type: "create", data: null });
		setFieldErrors({});
	};

	const openCreateModal = () => {
		setFormData({ name: "", slug: "" });
		setFieldErrors({});
		setModal({ isOpen: true, type: "create", data: null });
	};

	const openEditModal = (procedure: Procedure) => {
		setFormData({ name: procedure.name, slug: procedure.slug });
		setFieldErrors({});
		setModal({ isOpen: true, type: "edit", data: procedure });
	};

	const openDeleteModal = (procedure: Procedure) => {
		setModal({ isOpen: true, type: "delete", data: procedure });
	};

	const handleNameChange = (name: string) => {
		setFormData((prev) => ({
			name,
			slug: modal.type === "create" ? generateSlug(name) : prev.slug,
		}));
	};

	const handleSubmit = async () => {
		setIsSubmitting(true);
		setFieldErrors({});
		setError(null);
		try {
			if (modal.type === "create") {
				await apiFetch("/api/procedimentos", {
					method: "POST",
					body: JSON.stringify(formData),
				});
				setSuccessMsg("Procedimento criado com sucesso!");
			} else if (modal.type === "edit" && modal.data) {
				await apiFetch(`/api/procedimentos/${modal.data.id}`, {
					method: "PUT",
					body: JSON.stringify(formData),
				});
				setSuccessMsg("Procedimento atualizado com sucesso!");
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
			await apiFetch(`/api/procedimentos/${modal.data.id}`, { method: "DELETE" });
			setSuccessMsg("Procedimento excluído com sucesso!");
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
				title="Procedimentos"
				total={total}
				action={{ label: "+ Novo Procedimento", onClick: openCreateModal }}
			/>

			{error && <AdminAlert message={error} onDismiss={() => setError(null)} />}
			{successMsg && (
				<AdminAlert
					message={successMsg}
					type="success"
					onDismiss={() => setSuccessMsg(null)}
				/>
			)}

			<SearchBar placeholder="Buscar por nome ou slug..." onSearch={handleSearch} />

			<AdminTable
				columns={columns}
				data={procedures}
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
				title={modal.type === "create" ? "Novo Procedimento" : "Editar Procedimento"}
				onClose={closeModal}
				onConfirm={handleSubmit}
				confirmText={modal.type === "create" ? "Criar" : "Salvar"}
				isLoading={isSubmitting}
			>
				<div className="space-y-1">
					<FormField
						label="Nome"
						name="name"
						value={formData.name}
						onChange={(v) => handleNameChange(String(v))}
						error={fieldErrors.name}
						required
						placeholder="Ex: Ginecologia"
					/>
					<FormField
						label="Slug"
						name="slug"
						value={formData.slug}
						onChange={(v) => setFormData({ ...formData, slug: String(v) })}
						error={fieldErrors.slug}
						required
						placeholder="Ex: ginecologia"
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
