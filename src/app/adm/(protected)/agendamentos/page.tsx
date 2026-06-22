"use client";

import { useState, useMemo } from "react";
import AdminTable, { TableColumn } from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import SearchBar from "@/components/admin/SearchBar";
import Pagination from "@/components/admin/Pagination";
import { mockAppointments, mockDoctors, mockExams } from "@/lib/admin/mockData";
import { Appointment } from "@/lib/admin/types";
import { FormField } from "@/components/admin/AdminForm";

const columns: TableColumn<Appointment>[] = [
	{
		key: "doctorId",
		label: "Médico",
		render: (value) => {
			const doctor = mockDoctors.find((d) => d.id === value);
			return doctor?.name || "N/A";
		},
	},
	{
		key: "examId",
		label: "Exame",
		render: (value) => {
			const exam = mockExams.find((e) => e.id === value);
			return exam?.name || "N/A";
		},
	},
	{ key: "date", label: "Data", sortable: true },
	{ key: "startTime", label: "Horário", sortable: true },
	{ key: "phone", label: "Telefone" },
	{
		key: "createdAt",
		label: "Criado em",
		render: (value) => new Date(value).toLocaleDateString("pt-BR"),
	},
];

export default function AppointmentsPage() {
	const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [modal, setModal] = useState<{
		isOpen: boolean;
		type: "create" | "edit" | "delete";
		data: Appointment | null;
	}>({
		isOpen: false,
		type: "create",
		data: null,
	});
	const [formData, setFormData] = useState({
		doctorId: 1,
		examId: 1,
		date: "",
		startTime: "",
		endTime: "",
		phone: "",
	});
	const itemsPerPage = 10;

	const filteredAppointments = useMemo(() => {
		return appointments.filter(
			(apt) =>
				mockDoctors
					.find((d) => d.id === apt.doctorId)
					?.name.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				apt.phone.includes(searchTerm) ||
				apt.date.includes(searchTerm),
		);
	}, [appointments, searchTerm]);

	const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
	const paginatedAppointments = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage;
		return filteredAppointments.slice(start, start + itemsPerPage);
	}, [filteredAppointments, currentPage]);

	const openCreateModal = () => {
		setFormData({
			doctorId: 1,
			examId: 1,
			date: "",
			startTime: "",
			endTime: "",
			phone: "",
		});
		setModal({ isOpen: true, type: "create", data: null });
	};

	const openEditModal = (appointment: Appointment) => {
		setFormData({
			doctorId: appointment.doctorId,
			examId: appointment.examId,
			date: appointment.date,
			startTime: appointment.startTime,
			endTime: appointment.endTime,
			phone: appointment.phone,
		});
		setModal({ isOpen: true, type: "edit", data: appointment });
	};

	const openDeleteModal = (appointment: Appointment) => {
		setModal({ isOpen: true, type: "delete", data: appointment });
	};

	const handleSubmit = () => {
		if (modal.type === "create") {
			const newAppointment: Appointment = {
				id: Math.max(...appointments.map((a) => a.id), 0) + 1,
				...formData,
				createdAt: new Date().toISOString().split("T")[0],
				updatedAt: new Date().toISOString().split("T")[0],
			};
			setAppointments([...appointments, newAppointment]);
		} else if (modal.type === "edit" && modal.data) {
			setAppointments(
				appointments.map((a) =>
					a.id === modal.data?.id
						? {
								...a,
								...formData,
								updatedAt: new Date().toISOString().split("T")[0],
							}
						: a,
				),
			);
		}
		setModal({ isOpen: false, type: "create", data: null });
	};

	const handleDelete = () => {
		if (modal.data) {
			setAppointments(appointments.filter((a) => a.id !== modal.data?.id));
		}
		setModal({ isOpen: false, type: "create", data: null });
	};

	return (
		<div>
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
				<h1 className="text-3xl font-bold text-(--main-dark-color)">Agendamentos</h1>
				<button onClick={openCreateModal} className="px-6 py-2 bg-(--main-color) text-white rounded-lg hover:bg-(--main-light-color) transition-colors font-semibold">
					+ Novo Agendamento
				</button>
			</div>

			<SearchBar placeholder="Buscar por médico, telefone ou data..." onSearch={setSearchTerm} />

			<AdminTable<Appointment> columns={columns} data={paginatedAppointments} onEdit={openEditModal} onDelete={openDeleteModal} />

			{totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}

			{/* Create/Edit Modal */}
			<AdminModal isOpen={modal.isOpen && (modal.type === "create" || modal.type === "edit")} title={modal.type === "create" ? "Novo Agendamento" : "Editar Agendamento"} onClose={() => setModal({ isOpen: false, type: "create", data: null })} onConfirm={handleSubmit} confirmText={modal.type === "create" ? "Criar" : "Salvar"}>
				<div className="space-y-4">
					<FormField label="Médico" name="doctorId" type="select" value={formData.doctorId} onChange={(value) => setFormData({ ...formData, doctorId: Number(value) })} options={mockDoctors.map((d) => ({ label: d.name, value: d.id }))} />
					<FormField label="Exame" name="examId" type="select" value={formData.examId} onChange={(value) => setFormData({ ...formData, examId: Number(value) })} options={mockExams.map((e) => ({ label: e.name, value: e.id }))} />
					<FormField label="Data" name="date" type="date" value={formData.date} onChange={(value) => setFormData({ ...formData, date: String(value) })} required />
					<FormField label="Horário Início" name="startTime" type="time" value={formData.startTime} onChange={(value) => setFormData({ ...formData, startTime: String(value) })} required />
					<FormField label="Horário Fim" name="endTime" type="time" value={formData.endTime} onChange={(value) => setFormData({ ...formData, endTime: String(value) })} required />
					<FormField label="Telefone" name="phone" type="text" value={formData.phone} onChange={(value) => setFormData({ ...formData, phone: String(value) })} required placeholder="(11) 98765-4321" />
				</div>
			</AdminModal>

			{/* Delete Modal */}
			<AdminModal isOpen={modal.isOpen && modal.type === "delete"} title="Confirmar Exclusão" onClose={() => setModal({ isOpen: false, type: "create", data: null })} onConfirm={handleDelete} confirmText="Excluir" type="danger">
				<p className="text-gray-700">Tem certeza que deseja excluir este agendamento?</p>
				<p className="text-sm text-gray-500 mt-2">
					{modal.data && (
						<>
							Médico: {mockDoctors.find((d) => d.id === modal.data?.doctorId)?.name}
							<br />
							Data: {modal.data.date} às {modal.data.startTime}
						</>
					)}
				</p>
				<p className="text-sm text-gray-500">Esta ação não pode ser desfeita.</p>
			</AdminModal>
		</div>
	);
}
