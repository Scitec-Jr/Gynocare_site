"use client";

import { useEffect, useMemo, useState } from "react";
import AdminTable, { TableColumn } from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import AdminAlert from "@/components/admin/AdminAlert";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Pagination from "@/components/admin/Pagination";
import { FormField } from "@/components/admin/AdminForm";
import { useAdminList } from "@/hooks/useAdminList";
import { apiFetch, ApiRequestError } from "@/lib/admin/api";
import { Review } from "@/lib/admin/types";
import { formatDate, truncateText } from "@/lib/admin/utils";

function StarRating({ rating }: { rating: number }) {
	return (
		<div className="flex items-center gap-1">
			{Array.from({ length: 5 }, (_, i) => (
				<span
					key={i}
					className={i < rating ? "text-yellow-400" : "text-gray-200"}
				>
					★
				</span>
			))}
			<span className="text-xs text-gray-500 ml-1">({rating}/5)</span>
		</div>
	);
}

export default function ReviewsPage() {
	const [statusFilter, setStatusFilter] = useState<string>("");

	const extraParams = useMemo(
		() => (statusFilter ? { status: statusFilter } : {}),
		[statusFilter],
	);

	const {
		data: reviews,
		currentPage,
		setCurrentPage,
		totalPages,
		total,
		isLoading,
		error,
		setError,
		refetch,
	} = useAdminList<Review>("/api/avaliacoes", { extraParams });

	useEffect(() => {
		setCurrentPage(1);
	}, [statusFilter, setCurrentPage]);

	const [modal, setModal] = useState<{
		isOpen: boolean;
		type: "edit" | "delete" | "view";
		data: Review | null;
	}>({ isOpen: false, type: "view", data: null });

	const [formData, setFormData] = useState({ rating: 5, text: "", status: true });
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [successMsg, setSuccessMsg] = useState<string | null>(null);

	const columns: TableColumn<Review>[] = [
		{
			key: "rating",
			label: "Avaliação",
			render: (value) => <StarRating rating={value} />,
		},
		{
			key: "text",
			label: "Comentário",
			render: (value) =>
				value ? truncateText(value, 60) : (
					<span className="text-gray-400 italic">Sem comentário</span>
				),
		},
		{
			key: "status",
			label: "Status",
			render: (value) => (
				<span
					className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
						value
							? "bg-green-100 text-green-700"
							: "bg-amber-100 text-amber-700"
					}`}
				>
					{value ? "Publicada" : "Pendente"}
				</span>
			),
		},
		{
			key: "createdAt",
			label: "Data",
			render: (value) => formatDate(value),
		},
	];

	const closeModal = () => {
		setModal({ isOpen: false, type: "view", data: null });
		setFieldErrors({});
	};

	const openViewModal = (review: Review) => {
		setFormData({
			rating: review.rating,
			text: review.text || "",
			status: review.status,
		});
		setModal({ isOpen: true, type: "view", data: review });
	};

	const openEditModal = (review: Review) => {
		setFormData({
			rating: review.rating,
			text: review.text || "",
			status: review.status,
		});
		setFieldErrors({});
		setModal({ isOpen: true, type: "edit", data: review });
	};

	const openDeleteModal = (review: Review) => {
		setModal({ isOpen: true, type: "delete", data: review });
	};

	const handleSubmit = async () => {
		if (!modal.data) return;
		setIsSubmitting(true);
		setFieldErrors({});
		setError(null);
		try {
			await apiFetch(`/api/avaliacoes/${modal.data.id}`, {
				method: "PUT",
				body: JSON.stringify(formData),
			});
			setSuccessMsg("Avaliação atualizada com sucesso!");
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
			await apiFetch(`/api/avaliacoes/${modal.data.id}`, { method: "DELETE" });
			setSuccessMsg("Avaliação excluída com sucesso!");
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
			<AdminPageHeader title="Avaliações" total={total} />

			{error && <AdminAlert message={error} onDismiss={() => setError(null)} />}
			{successMsg && (
				<AdminAlert
					message={successMsg}
					type="success"
					onDismiss={() => setSuccessMsg(null)}
				/>
			)}

			<div className="mb-6">
				<select
					value={statusFilter}
					onChange={(e) => setStatusFilter(e.target.value)}
					className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-(--main-color)/30"
				>
					<option value="">Todos os status</option>
					<option value="true">Publicadas</option>
					<option value="false">Pendentes</option>
				</select>
			</div>

			<AdminTable
				columns={columns}
				data={reviews}
				onView={openViewModal}
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
				isOpen={modal.isOpen && modal.type === "view"}
				title="Visualizar Avaliação"
				onClose={closeModal}
				cancelText="Fechar"
			>
				<div className="space-y-4">
					<div>
						<p className="text-xs font-semibold text-gray-500 uppercase mb-1">
							Avaliação
						</p>
						<StarRating rating={formData.rating} />
					</div>
					<div>
						<p className="text-xs font-semibold text-gray-500 uppercase mb-1">
							Comentário
						</p>
						<p className="text-gray-800 text-sm leading-relaxed">
							{formData.text || "Sem comentário"}
						</p>
					</div>
					<div>
						<p className="text-xs font-semibold text-gray-500 uppercase mb-1">
							Status
						</p>
						<p className="text-gray-800 text-sm">
							{formData.status ? "Publicada" : "Pendente"}
						</p>
					</div>
					{modal.data && (
						<div>
							<p className="text-xs font-semibold text-gray-500 uppercase mb-1">
								Data
							</p>
							<p className="text-gray-800 text-sm">
								{formatDate(modal.data.createdAt)}
							</p>
						</div>
					)}
				</div>
			</AdminModal>

			<AdminModal
				isOpen={modal.isOpen && modal.type === "edit"}
				title="Editar Avaliação"
				onClose={closeModal}
				onConfirm={handleSubmit}
				confirmText="Salvar"
				isLoading={isSubmitting}
			>
				<div className="space-y-1">
					<FormField
						label="Avaliação (1-5)"
						name="rating"
						type="number"
						value={formData.rating}
						onChange={(v) =>
							setFormData({
								...formData,
								rating: Math.min(5, Math.max(1, Number(v))),
							})
						}
						error={fieldErrors.rating}
					/>
					<FormField
						label="Comentário"
						name="text"
						type="textarea"
						value={formData.text}
						onChange={(v) => setFormData({ ...formData, text: String(v) })}
						error={fieldErrors.text}
						rows={4}
					/>
					<label className="flex items-center gap-2 mt-2 cursor-pointer">
						<input
							type="checkbox"
							checked={formData.status}
							onChange={(e) =>
								setFormData({ ...formData, status: e.target.checked })
							}
							className="w-4 h-4 rounded border-gray-300"
						/>
						<span className="text-sm font-medium text-gray-700">
							Publicar avaliação
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
				<p className="text-gray-700">Tem certeza que deseja excluir esta avaliação?</p>
				<p className="text-sm text-gray-500 mt-2">Esta ação não pode ser desfeita.</p>
			</AdminModal>
		</div>
	);
}
