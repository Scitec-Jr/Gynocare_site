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
import { Appointment, Doctor, Exam } from "@/lib/admin/types";
import { formatDate, maskPhone } from "@/lib/admin/utils";

export default function AppointmentsPage() {
	const {
		data: appointments,
		currentPage,
		setCurrentPage,
		totalPages,
		total,
		handleSearch,
		isLoading,
		error,
		setError,
		refetch,
	} = useAdminList<Appointment>("/api/agendamentos");

	const [doctors, setDoctors] = useState<Doctor[]>([]);
	const [exams, setExams] = useState<Exam[]>([]);
	const [modal, setModal] = useState<{
		isOpen: boolean;
		type: "create" | "edit" | "delete";
		data: Appointment | null;
	}>({ isOpen: false, type: "create", data: null });

	const [formData, setFormData] = useState({
		doctorId: 0,
		examId: 0,
		date: "",
		startTime: "",
		endTime: "",
		phone: "",
	});
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [successMsg, setSuccessMsg] = useState<string | null>(null);

	const doctorMap = useMemo(
		() => new Map(doctors.map((d) => [d.id, d.name])),
		[doctors],
	);
	const examMap = useMemo(
		() => new Map(exams.map((e) => [e.id, e.name])),
		[exams],
	);

	const columns: TableColumn<Appointment>[] = [
		{
			key: "doctorId",
			label: "Médico",
			render: (value) => doctorMap.get(value) || "—",
		},
		{
			key: "examId",
			label: "Exame",
			render: (value) => examMap.get(value) || "—",
		},
		{
			key: "date",
			label: "Data",
			render: (value) => formatDate(value),
		},
		{ key: "startTime", label: "Início" },
		{ key: "endTime", label: "Fim" },
		{ key: "phone", label: "Telefone" },
	];

	useEffect(() => {
		Promise.all([
			fetchAll<Doctor>("/api/doutores"),
			fetchAll<Exam>("/api/exames"),
		]).then(([d, e]) => {
			setDoctors(d);
			setExams(e);
		});
	}, []);

	const doctorOptions = doctors.map((d) => ({ label: d.name, value: d.id }));
	const examOptions = exams.map((e) => ({ label: e.name, value: e.id }));

	const closeModal = () => {
		setModal({ isOpen: false, type: "create", data: null });
		setFieldErrors({});
	};

	const openCreateModal = () => {
		setFormData({
			doctorId: doctors[0]?.id || 0,
			examId: exams[0]?.id || 0,
			date: "",
			startTime: "",
			endTime: "",
			phone: "",
		});
		setFieldErrors({});
		setModal({ isOpen: true, type: "create", data: null });
	};

	const openEditModal = (appointment: Appointment) => {
		setFormData({
			doctorId: appointment.doctorId,
			examId: appointment.examId,
			date: appointment.date.split("T")[0],
			startTime: appointment.startTime.slice(0, 5),
			endTime: appointment.endTime.slice(0, 5),
			phone: appointment.phone,
		});
		setFieldErrors({});
		setModal({ isOpen: true, type: "edit", data: appointment });
	};

	const openDeleteModal = (appointment: Appointment) => {
		setModal({ isOpen: true, type: "delete", data: appointment });
	};

	const handleSubmit = async () => {
		setIsSubmitting(true);
		setFieldErrors({});
		setError(null);
		try {
			const payload = {
				...formData,
				startTime: formData.startTime.slice(0, 5),
				endTime: formData.endTime.slice(0, 5),
			};

			if (modal.type === "create") {
				await apiFetch("/api/agendamentos", {
					method: "POST",
					body: JSON.stringify(payload),
				});
				setSuccessMsg("Agendamento criado com sucesso!");
			} else if (modal.type === "edit" && modal.data) {
				await apiFetch(`/api/agendamentos/${modal.data.id}`, {
					method: "PUT",
					body: JSON.stringify(payload),
				});
				setSuccessMsg("Agendamento atualizado com sucesso!");
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
			await apiFetch(`/api/agendamentos/${modal.data.id}`, { method: "DELETE" });
			setSuccessMsg("Agendamento excluído com sucesso!");
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
				title="Agendamentos"
				total={total}
				action={{ label: "+ Novo Agendamento", onClick: openCreateModal }}
			/>

			{error && <AdminAlert message={error} onDismiss={() => setError(null)} />}
			{successMsg && (
				<AdminAlert
					message={successMsg}
					type="success"
					onDismiss={() => setSuccessMsg(null)}
				/>
			)}

			<SearchBar
				placeholder="Buscar por telefone ou data..."
				onSearch={handleSearch}
			/>

			<AdminTable
				columns={columns}
				data={appointments}
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
				title={
					modal.type === "create" ? "Novo Agendamento" : "Editar Agendamento"
				}
				onClose={closeModal}
				onConfirm={handleSubmit}
				confirmText={modal.type === "create" ? "Criar" : "Salvar"}
				isLoading={isSubmitting}
				size="lg"
			>
				<div className="space-y-1">
					<FormField
						label="Médico"
						name="doctorId"
						type="select"
						value={formData.doctorId}
						onChange={(v) =>
							setFormData({ ...formData, doctorId: Number(v) })
						}
						error={fieldErrors.doctorId}
						options={doctorOptions}
						required
					/>
					<FormField
						label="Exame"
						name="examId"
						type="select"
						value={formData.examId}
						onChange={(v) => setFormData({ ...formData, examId: Number(v) })}
						error={fieldErrors.examId}
						options={examOptions}
						required
					/>
					<FormField
						label="Data"
						name="date"
						type="date"
						value={formData.date}
						onChange={(v) => setFormData({ ...formData, date: String(v) })}
						error={fieldErrors.date}
						required
					/>
					<div className="grid grid-cols-2 gap-3">
						<FormField
							label="Horário Início"
							name="startTime"
							type="time"
							value={formData.startTime}
							onChange={(v) =>
								setFormData({ ...formData, startTime: String(v) })
							}
							error={fieldErrors.startTime}
							required
						/>
						<FormField
							label="Horário Fim"
							name="endTime"
							type="time"
							value={formData.endTime}
							onChange={(v) =>
								setFormData({ ...formData, endTime: String(v) })
							}
							error={fieldErrors.endTime}
							required
						/>
					</div>
					<FormField
						label="Telefone"
						name="phone"
						value={formData.phone}
						onChange={(v) =>
							setFormData({ ...formData, phone: maskPhone(String(v)) })
						}
						error={fieldErrors.phone}
						required
						placeholder="(11) 98765-4321"
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
				<p className="text-gray-700">Tem certeza que deseja excluir este agendamento?</p>
				{modal.data && (
					<p className="text-sm text-gray-500 mt-2">
						{doctorMap.get(modal.data.doctorId)} ·{" "}
						{formatDate(modal.data.date)} às {modal.data.startTime}
					</p>
				)}
			</AdminModal>
		</div>
	);
}
