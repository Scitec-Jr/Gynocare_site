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
import { apiFetch, ApiRequestError, fetchAll } from "@/lib/admin/api";
import { Doctor, Exam } from "@/lib/admin/types";
import { formatDate } from "@/lib/admin/utils";

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
	const [examModalDoctor, setExamModalDoctor] = useState<Doctor | null>(null);
	const [availableExams, setAvailableExams] = useState<Exam[]>([]);
	const [selectedExamIds, setSelectedExamIds] = useState<number[]>([]);
	const [examSearch, setExamSearch] = useState("");
	const [isLoadingExams, setIsLoadingExams] = useState(false);
	const [isSavingExams, setIsSavingExams] = useState(false);
	const [examError, setExamError] = useState<string | null>(null);

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

	const closeExamModal = () => {
		setExamModalDoctor(null);
		setExamError(null);
		setExamSearch("");
	};

	const openExamModal = async (doctor: Doctor) => {
		setExamModalDoctor(doctor);
		setSelectedExamIds([]);
		setExamError(null);
		setExamSearch("");
		setIsLoadingExams(true);

		try {
			const [exams, doctorExams] = await Promise.all([
				fetchAll<Exam>("/api/exames"),
				apiFetch<{ examIds: number[] }>(`/api/doutores/${doctor.id}/exames`),
			]);
			setAvailableExams(exams);
			setSelectedExamIds(doctorExams.examIds);
		} catch (err) {
			setExamError(err instanceof Error ? err.message : "Não foi possível carregar os exames.");
		} finally {
			setIsLoadingExams(false);
		}
	};

	const handleSaveExams = async () => {
		if (!examModalDoctor) return;

		setIsSavingExams(true);
		setExamError(null);
		try {
			await apiFetch(`/api/doutores/${examModalDoctor.id}/exames`, {
				method: "PUT",
				body: JSON.stringify({ examIds: selectedExamIds }),
			});
			setSuccessMsg(`Exames de ${examModalDoctor.name} atualizados com sucesso!`);
			closeExamModal();
		} catch (err) {
			setExamError(err instanceof ApiRequestError ? err.message : "Não foi possível atualizar os exames.");
		} finally {
			setIsSavingExams(false);
		}
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

	const columns: TableColumn<Doctor>[] = [
		{ key: "name", label: "Nome" },
		{
			key: "id",
			label: "Exames",
			width: "w-40",
			render: (_, doctor) => (
				<button
					type="button"
					onClick={() => openExamModal(doctor)}
					className="px-3 py-1.5 text-xs font-medium text-teal-800 bg-teal-50 rounded-md hover:bg-teal-100 transition-colors"
				>
					Editar exames
				</button>
			),
		},
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
	const filteredExams = availableExams.filter((exam) =>
		exam.name.toLowerCase().includes(examSearch.trim().toLowerCase()),
	);

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

			<AdminModal
				isOpen={examModalDoctor !== null}
				title={`Exames de ${examModalDoctor?.name ?? "médico"}`}
				onClose={closeExamModal}
				onConfirm={examError ? undefined : handleSaveExams}
				confirmText="Salvar exames"
				size="lg"
				isLoading={isSavingExams || isLoadingExams}
			>
				<div className="space-y-4">
					{examError && <AdminAlert message={examError} onDismiss={() => setExamError(null)} />}
					<p className="text-sm text-gray-600">Selecione os exames que este médico realiza.</p>
					<input
						type="search"
						value={examSearch}
						onChange={(event) => setExamSearch(event.target.value)}
						placeholder="Buscar exame..."
						aria-label="Buscar exames"
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-(--main-color) focus:outline-none focus:ring-2 focus:ring-(--main-color)/20"
					/>
					<p className="text-xs text-gray-500">
						{selectedExamIds.length} exame{selectedExamIds.length === 1 ? "" : "s"} selecionado{selectedExamIds.length === 1 ? "" : "s"}
					</p>

					{isLoadingExams ? (
						<p className="py-8 text-center text-sm text-gray-500">Carregando exames...</p>
					) : availableExams.length === 0 ? (
						<p className="py-8 text-center text-sm text-gray-500">Nenhum exame cadastrado.</p>
					) : (
						<div className="max-h-[50vh] divide-y divide-gray-100 overflow-y-auto border-y border-gray-200">
							{filteredExams.map((exam) => (
								<label key={exam.id} className="flex cursor-pointer items-center gap-3 px-2 py-3 hover:bg-gray-50">
									<input
										type="checkbox"
										checked={selectedExamIds.includes(exam.id)}
										onChange={(event) => {
											setSelectedExamIds((currentIds) => event.target.checked
												? [...currentIds, exam.id]
												: currentIds.filter((examId) => examId !== exam.id));
										}}
										className="h-4 w-4 accent-teal-700"
									/>
									<span className="text-sm text-gray-800">{exam.name}</span>
								</label>
							))}
							{filteredExams.length === 0 && (
								<p className="py-8 text-center text-sm text-gray-500">Nenhum exame corresponde à busca.</p>
							)}
						</div>
					)}
				</div>
			</AdminModal>
		</div>
	);
}
