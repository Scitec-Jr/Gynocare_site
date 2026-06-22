"use client";

import { useState, useMemo } from "react";
import AdminTable, { TableColumn } from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import SearchBar from "@/components/admin/SearchBar";
import Pagination from "@/components/admin/Pagination";
import { mockExams, mockProcedures } from "@/lib/admin/mockData";
import { Exam } from "@/lib/admin/types";
import { FormField } from "@/components/admin/AdminForm";

const columns: TableColumn<Exam>[] = [
	{ key: "name", label: "Nome do Exame", sortable: true },
	{ key: "slug", label: "Slug", sortable: true },
	{
		key: "procedureId",
		label: "Procedimento",
		render: (value) => {
			const proc = mockProcedures.find((p) => p.id === value);
			return proc?.name || "N/A";
		},
	},
	{
		key: "createdAt",
		label: "Criado em",
		render: (value) => new Date(value).toLocaleDateString("pt-BR"),
	},
];

export default function ExamsPage() {
	const [exams, setExams] = useState<Exam[]>(mockExams);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [modal, setModal] = useState<{
		isOpen: boolean;
		type: "create" | "edit" | "delete";
		data: Exam | null;
	}>({
		isOpen: false,
		type: "create",
		data: null,
	});
	const [formData, setFormData] = useState({
		name: "",
		slug: "",
		information: "",
		preparation: "",
		procedureId: 1,
	});
	const itemsPerPage = 10;

	const filteredExams = useMemo(() => {
		return exams.filter((exam) => exam.name.toLowerCase().includes(searchTerm.toLowerCase()) || exam.slug.toLowerCase().includes(searchTerm.toLowerCase()));
	}, [exams, searchTerm]);

	const totalPages = Math.ceil(filteredExams.length / itemsPerPage);
	const paginatedExams = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage;
		return filteredExams.slice(start, start + itemsPerPage);
	}, [filteredExams, currentPage]);

	const openCreateModal = () => {
		setFormData({ name: "", slug: "", information: "", preparation: "", procedureId: 1 });
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
		setModal({ isOpen: true, type: "edit", data: exam });
	};

	const openDeleteModal = (exam: Exam) => {
		setModal({ isOpen: true, type: "delete", data: exam });
	};

	const handleSubmit = () => {
		if (modal.type === "create") {
			const newExam: Exam = {
				id: Math.max(...exams.map((e) => e.id), 0) + 1,
				...formData,
				createdAt: new Date().toISOString().split("T")[0],
				updatedAt: new Date().toISOString().split("T")[0],
			};
			setExams([...exams, newExam]);
		} else if (modal.type === "edit" && modal.data) {
			setExams(
				exams.map((e) =>
					e.id === modal.data?.id
						? {
								...e,
								...formData,
								updatedAt: new Date().toISOString().split("T")[0],
							}
						: e,
				),
			);
		}
		setModal({ isOpen: false, type: "create", data: null });
	};

	const handleDelete = () => {
		if (modal.data) {
			setExams(exams.filter((e) => e.id !== modal.data?.id));
		}
		setModal({ isOpen: false, type: "create", data: null });
	};

	return (
		<div>
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
				<h1 className="text-3xl font-bold text-(--main-dark-color)">Exames</h1>
				<button onClick={openCreateModal} className="px-6 py-2 bg-(--main-color) text-white rounded-lg hover:bg-(--main-light-color) transition-colors font-semibold">
					+ Novo Exame
				</button>
			</div>

			<SearchBar placeholder="Buscar por nome ou slug..." onSearch={setSearchTerm} />

			<AdminTable<Exam> columns={columns} data={paginatedExams} onEdit={openEditModal} onDelete={openDeleteModal} />

			{totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}

			{/* Create/Edit Modal */}
			<AdminModal isOpen={modal.isOpen && (modal.type === "create" || modal.type === "edit")} title={modal.type === "create" ? "Novo Exame" : "Editar Exame"} onClose={() => setModal({ isOpen: false, type: "create", data: null })} onConfirm={handleSubmit} confirmText={modal.type === "create" ? "Criar" : "Salvar"}>
				<div className="space-y-4">
					<FormField label="Nome do Exame" name="name" value={formData.name} onChange={(value) => setFormData({ ...formData, name: String(value) })} required placeholder="Ex: Ultrassom Pélvico" />
					<FormField label="Slug" name="slug" value={formData.slug} onChange={(value) => setFormData({ ...formData, slug: String(value) })} required placeholder="Ex: ultrassom-pelvico" />
					<FormField label="Procedimento" name="procedureId" type="select" value={formData.procedureId} onChange={(value) => setFormData({ ...formData, procedureId: Number(value) })} options={mockProcedures.map((p) => ({ label: p.name, value: p.id }))} />
					<FormField label="Informações" name="information" type="textarea" value={formData.information} onChange={(value) => setFormData({ ...formData, information: String(value) })} required placeholder="Descreva o exame..." rows={3} />
					<FormField label="Preparação" name="preparation" type="textarea" value={formData.preparation} onChange={(value) => setFormData({ ...formData, preparation: String(value) })} required placeholder="Instruções de preparação..." rows={3} />
				</div>
			</AdminModal>

			{/* Delete Modal */}
			<AdminModal isOpen={modal.isOpen && modal.type === "delete"} title="Confirmar Exclusão" onClose={() => setModal({ isOpen: false, type: "create", data: null })} onConfirm={handleDelete} confirmText="Excluir" type="danger">
				<p className="text-gray-700">
					Tem certeza que deseja excluir <strong>{modal.data?.name}</strong>?
				</p>
				<p className="text-sm text-gray-500 mt-2">Esta ação não pode ser desfeita.</p>
			</AdminModal>
		</div>
	);
}
