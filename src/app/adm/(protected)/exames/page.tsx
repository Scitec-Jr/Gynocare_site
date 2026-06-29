"use client";

import { useEffect, useMemo, useState } from "react";
import AdminTable, { TableColumn } from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import AdminAlert from "@/components/admin/AdminAlert";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import SearchBar from "@/components/admin/SearchBar";
import Pagination from "@/components/admin/Pagination";
import { FormField } from "@/components/admin/AdminForm";
import { useAdminList } from "@/hooks/useAdminList";
import { apiFetch, ApiRequestError, fetchAll } from "@/lib/admin/api";
import { Exam, Procedure } from "@/lib/admin/types";
import { formatDate, generateSlug } from "@/lib/admin/utils";

export default function ExamsPage() {
	const {
		data: exams,
		currentPage,
		setCurrentPage,
		totalPages,
		total,
		handleSearch,
		isLoading,
		error,
		setError,
		refetch,
	} = useAdminList<Exam>("/api/exames");

	const [procedures, setProcedures] = useState<Procedure[]>([]);
	const [modal, setModal] = useState<{
		isOpen: boolean;
		type: "create" | "edit" | "delete";
		data: Exam | null;
	}>({ isOpen: false, type: "create", data: null });

	const [formData, setFormData] = useState({
		name: "",
		slug: "",
		information: "",
		preparation: "",
		procedureId: 0,
	});
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [successMsg, setSuccessMsg] = useState<string | null>(null);

	const procedureMap = useMemo(
		() => new Map(procedures.map((p) => [p.id, p.name])),
		[procedures],
	);

	const columns: TableColumn<Exam>[] = [
		{ key: "name", label: "Nome do Exame" },
		{
			key: "slug",
			label: "Slug",
			render: (value) => (
				<span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{value}</span>
			),
		},
		{
			key: "procedureId",
			label: "Procedimento",
			render: (value) => procedureMap.get(value) || "—",
		},
		{
			key: "createdAt",
			label: "Criado em",
			render: (value) => formatDate(value),
		},
	];

	useEffect(() => {
		fetchAll<Procedure>("/api/procedimentos")
			.then(setProcedures)
			.catch(() => {});
	}, []);

	const procedureOptions = procedures.map((p) => ({
		label: p.name,
		value: p.id,
	}));

	const closeModal = () => {
		setModal({ isOpen: false, type: "create", data: null });
		setFieldErrors({});
	};

	const openCreateModal = () => {
		setFormData({
			name: "",
			slug: "",
			information: "",
			preparation: "",
			procedureId: procedures[0]?.id || 0,
		});
		setFieldErrors({});
		setModal({ isOpen: true, type: "create", data: null });
	};

	const openEditModal = (exam: Exam) => {
		setFormData({
			name: exam.name,
			slug: exam.slug,
			information: exam.information,
			preparation: exam.preparation,
			procedureId: exam.procedureId,
		});
		setFieldErrors({});
		setModal({ isOpen: true, type: "edit", data: exam });
	};

	const openDeleteModal = (exam: Exam) => {
		setModal({ isOpen: true, type: "delete", data: exam });
	};

	const handleNameChange = (name: string) => {
		setFormData((prev) => ({
			...prev,
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
				await apiFetch("/api/exames", {
					method: "POST",
					body: JSON.stringify(formData),
				});
				setSuccessMsg("Exame criado com sucesso!");
			} else if (modal.type === "edit" && modal.data) {
				await apiFetch(`/api/exames/${modal.data.id}`, {
					method: "PUT",
					body: JSON.stringify(formData),
				});
				setSuccessMsg("Exame atualizado com sucesso!");
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
			await apiFetch(`/api/exames/${modal.data.id}`, { method: "DELETE" });
			setSuccessMsg("Exame excluído com sucesso!");
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
				title="Exames"
				total={total}
				action={{ label: "+ Novo Exame", onClick: openCreateModal }}
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
				data={exams}
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
				title={modal.type === "create" ? "Novo Exame" : "Editar Exame"}
				onClose={closeModal}
				onConfirm={handleSubmit}
				confirmText={modal.type === "create" ? "Criar" : "Salvar"}
				isLoading={isSubmitting}
				size="lg"
			>
				<div className="space-y-1">
					<FormField
						label="Nome do Exame"
						name="name"
						value={formData.name}
						onChange={(v) => handleNameChange(String(v))}
						error={fieldErrors.name}
						required
						placeholder="Ex: Ultrassom Pélvico"
					/>
					<FormField
						label="Slug"
						name="slug"
						value={formData.slug}
						onChange={(v) => setFormData({ ...formData, slug: String(v) })}
						error={fieldErrors.slug}
						required
						placeholder="Ex: ultrassom-pelvico"
					/>
					<FormField
						label="Procedimento"
						name="procedureId"
						type="select"
						value={formData.procedureId}
						onChange={(v) =>
							setFormData({ ...formData, procedureId: Number(v) })
						}
						error={fieldErrors.procedureId}
						options={procedureOptions}
						required
					/>
					<FormField
						label="Informações"
						name="information"
						type="textarea"
						value={formData.information}
						onChange={(v) =>
							setFormData({ ...formData, information: String(v) })
						}
						error={fieldErrors.information}
						required
						placeholder="Descreva o exame..."
						rows={3}
					/>
					<FormField
						label="Preparação"
						name="preparation"
						type="textarea"
						value={formData.preparation}
						onChange={(v) =>
							setFormData({ ...formData, preparation: String(v) })
						}
						error={fieldErrors.preparation}
						required
						placeholder="Instruções de preparação..."
						rows={3}
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
