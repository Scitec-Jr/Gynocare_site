"use client";

import { useEffect, useState } from "react";
import AdminAlert from "@/components/admin/AdminAlert";
import AdminModal from "@/components/admin/AdminModal";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable, { TableColumn } from "@/components/admin/AdminTable";
import Pagination from "@/components/admin/Pagination";
import SearchBar from "@/components/admin/SearchBar";
import { FormField } from "@/components/admin/AdminForm";
import { useAdminList } from "@/hooks/useAdminList";
import { apiFetch, ApiRequestError, fetchAll } from "@/lib/admin/api";
import { Doctor } from "@/lib/admin/types";
import { formatDate } from "@/lib/admin/utils";

interface UnavailableDate {
  id: number;
  doctorId: number;
  doctorName: string;
  date: string;
}

const columns: TableColumn<UnavailableDate>[] = [
  { key: "doctorName", label: "Médico" },
  { key: "date", label: "Data", render: (value) => formatDate(value) },
];

export default function UnavailableDatesPage() {
  const {
    data: unavailableDates,
    currentPage,
    setCurrentPage,
    totalPages,
    total,
    handleSearch,
    isLoading,
    error,
    setError,
    refetch,
  } = useAdminList<UnavailableDate>("/api/indisponibilidades");

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: "create" | "edit" | "delete";
    data: UnavailableDate | null;
  }>({ isOpen: false, type: "create", data: null });
  const [formData, setFormData] = useState({ doctorId: 0, date: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchAll<Doctor>("/api/doutores").then(setDoctors).catch(() => setDoctors([]));
  }, []);

  const closeModal = () => {
    setModal({ isOpen: false, type: "create", data: null });
    setFieldErrors({});
  };

  const openCreateModal = () => {
    setFormData({ doctorId: doctors[0]?.id || 0, date: "" });
    setFieldErrors({});
    setModal({ isOpen: true, type: "create", data: null });
  };

  const openEditModal = (item: UnavailableDate) => {
    setFormData({ doctorId: item.doctorId, date: item.date.split("T")[0] });
    setFieldErrors({});
    setModal({ isOpen: true, type: "edit", data: item });
  };

  const openDeleteModal = (item: UnavailableDate) => {
    setModal({ isOpen: true, type: "delete", data: item });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setFieldErrors({});
    setError(null);
    try {
      const options = { method: modal.type === "create" ? "POST" : "PUT", body: JSON.stringify(formData) };
      const endpoint = modal.type === "create" ? "/api/indisponibilidades" : `/api/indisponibilidades/${modal.data?.id}`;
      await apiFetch(endpoint, options);
      setSuccessMsg(modal.type === "create" ? "Indisponibilidade criada com sucesso!" : "Indisponibilidade atualizada com sucesso!");
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
      await apiFetch(`/api/indisponibilidades/${modal.data.id}`, { method: "DELETE" });
      setSuccessMsg("Indisponibilidade excluída com sucesso!");
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
      <AdminPageHeader title="Indisponibilidades" total={total} action={{ label: "+ Nova Indisponibilidade", onClick: openCreateModal }} />
      {error && <AdminAlert message={error} onDismiss={() => setError(null)} />}
      {successMsg && <AdminAlert message={successMsg} type="success" onDismiss={() => setSuccessMsg(null)} />}
      <SearchBar placeholder="Buscar por médico ou data..." onSearch={handleSearch} />
      <AdminTable columns={columns} data={unavailableDates} onEdit={openEditModal} onDelete={openDeleteModal} isLoading={isLoading} />
      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}

      <AdminModal
        isOpen={modal.isOpen && (modal.type === "create" || modal.type === "edit")}
        title={modal.type === "create" ? "Nova Indisponibilidade" : "Editar Indisponibilidade"}
        onClose={closeModal}
        onConfirm={handleSubmit}
        confirmText={modal.type === "create" ? "Criar" : "Salvar"}
        isLoading={isSubmitting}
      >
        <FormField
          label="Médico"
          name="doctorId"
          type="select"
          value={formData.doctorId}
          onChange={(value) => setFormData({ ...formData, doctorId: Number(value) })}
          options={doctors.map((doctor) => ({ label: doctor.name, value: doctor.id }))}
          error={fieldErrors.doctorId}
          required
        />
        <FormField
          label="Data indisponível"
          name="date"
          type="date"
          value={formData.date}
          onChange={(value) => setFormData({ ...formData, date: String(value) })}
          error={fieldErrors.date}
          required
        />
      </AdminModal>

      <AdminModal isOpen={modal.isOpen && modal.type === "delete"} title="Confirmar Exclusão" onClose={closeModal} onConfirm={handleDelete} confirmText="Excluir" type="danger" isLoading={isSubmitting}>
        <p className="text-gray-700">Tem certeza que deseja excluir a indisponibilidade de <strong>{modal.data?.doctorName}</strong> em <strong>{modal.data && formatDate(modal.data.date)}</strong>?</p>
      </AdminModal>
    </div>
  );
}
