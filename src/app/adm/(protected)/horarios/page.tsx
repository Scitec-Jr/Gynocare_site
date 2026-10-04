"use client";

import { useEffect, useState } from "react";
import AdminAlert from "@/components/admin/AdminAlert";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { apiFetch, ApiRequestError, fetchAll } from "@/lib/admin/api";
import { Doctor } from "@/lib/admin/types";

interface WorkShift {
  startTime: string;
  endTime: string;
}

interface DoctorSchedule {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

const daysOfWeek = [
  { value: 0, label: "Domingo" },
  { value: 1, label: "Segunda-feira" },
  { value: 2, label: "Terça-feira" },
  { value: 3, label: "Quarta-feira" },
  { value: 4, label: "Quinta-feira" },
  { value: 5, label: "Sexta-feira" },
  { value: 6, label: "Sábado" },
];

function emptyWeeklySchedule(): Record<number, WorkShift[]> {
  return Object.fromEntries(daysOfWeek.map((day) => [day.value, []]));
}

function createNextShift(existingShifts: WorkShift[]): WorkShift | null {
  const startTime = existingShifts.at(-1)?.endTime ?? "08:00";
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = Math.min(startTotalMinutes + 240, 23 * 60 + 59);

  if (endTotalMinutes <= startTotalMinutes) return null;

  const endHour = Math.floor(endTotalMinutes / 60);
  const endMinute = endTotalMinutes % 60;

  return {
    startTime,
    endTime: `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}`,
  };
}

export default function DoctorSchedulesPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(0);
  const [weeklySchedule, setWeeklySchedule] = useState<Record<number, WorkShift[]>>(emptyWeeklySchedule);
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(true);
  const [isLoadingSchedule, setIsLoadingSchedule] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    fetchAll<Doctor>("/api/doutores")
      .then((result) => {
        if (!isActive) return;
        setDoctors(result);
        setSelectedDoctorId(result[0]?.id ?? 0);
      })
      .catch((requestError) => {
        if (isActive) {
          setError(requestError instanceof Error ? requestError.message : "Não foi possível carregar os médicos.");
        }
      })
      .finally(() => {
        if (isActive) setIsLoadingDoctors(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedDoctorId) {
      setWeeklySchedule(emptyWeeklySchedule());
      return;
    }

    let isActive = true;
    setIsLoadingSchedule(true);
    setError(null);
    setSuccessMessage(null);

    apiFetch<{ schedules: DoctorSchedule[] }>(`/api/horarios-medicos?doctorId=${selectedDoctorId}`)
      .then(({ schedules }) => {
        if (!isActive) return;
        const nextWeeklySchedule = emptyWeeklySchedule();

        schedules.forEach((schedule) => {
          nextWeeklySchedule[schedule.dayOfWeek].push({
            startTime: schedule.startTime,
            endTime: schedule.endTime,
          });
        });

        setWeeklySchedule(nextWeeklySchedule);
      })
      .catch((requestError) => {
        if (isActive) {
          setError(requestError instanceof Error ? requestError.message : "Não foi possível carregar os horários.");
          setWeeklySchedule(emptyWeeklySchedule());
        }
      })
      .finally(() => {
        if (isActive) setIsLoadingSchedule(false);
      });

    return () => {
      isActive = false;
    };
  }, [selectedDoctorId]);

  const updateShift = (
    dayOfWeek: number,
    shiftIndex: number,
    field: keyof WorkShift,
    value: string,
  ) => {
    setWeeklySchedule((currentSchedule) => ({
      ...currentSchedule,
      [dayOfWeek]: currentSchedule[dayOfWeek].map((shift, index) =>
        index === shiftIndex ? { ...shift, [field]: value } : shift,
      ),
    }));
    setSuccessMessage(null);
  };

  const addShift = (dayOfWeek: number) => {
    setWeeklySchedule((currentSchedule) => {
      const shifts = currentSchedule[dayOfWeek];
      const nextShift = createNextShift(shifts);
      if (!nextShift || shifts.length >= 4) return currentSchedule;

      return { ...currentSchedule, [dayOfWeek]: [...shifts, nextShift] };
    });
    setSuccessMessage(null);
  };

  const removeShift = (dayOfWeek: number, shiftIndex: number) => {
    setWeeklySchedule((currentSchedule) => ({
      ...currentSchedule,
      [dayOfWeek]: currentSchedule[dayOfWeek].filter((_, index) => index !== shiftIndex),
    }));
    setSuccessMessage(null);
  };

  const saveSchedule = async () => {
    if (!selectedDoctorId) return;

    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    const schedules = daysOfWeek.flatMap((day) =>
      weeklySchedule[day.value].map((shift) => ({
        dayOfWeek: day.value,
        startTime: shift.startTime,
        endTime: shift.endTime,
      })),
    );

    try {
      await apiFetch("/api/horarios-medicos", {
        method: "PUT",
        body: JSON.stringify({ doctorId: selectedDoctorId, schedules }),
      });
      setSuccessMessage("Horários de trabalho salvos com sucesso.");
    } catch (requestError) {
      if (requestError instanceof ApiRequestError) {
        setError(requestError.message);
      } else {
        setError("Não foi possível salvar os horários.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Horários de trabalho"
        subtitle="Configure os dias e turnos semanais de cada médico."
      />

      {error && <AdminAlert message={error} onDismiss={() => setError(null)} />}
      {successMessage && <AdminAlert message={successMessage} type="success" onDismiss={() => setSuccessMessage(null)} />}

      <div className="mb-6 max-w-md">
        <label htmlFor="doctor-schedule-doctor" className="mb-2 block text-sm font-medium text-gray-700">
          Médico
        </label>
        <select
          id="doctor-schedule-doctor"
          value={selectedDoctorId}
          onChange={(event) => setSelectedDoctorId(Number(event.target.value))}
          disabled={isLoadingDoctors || doctors.length === 0 || isSaving}
          className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-(--main-color) focus:outline-none focus:ring-2 focus:ring-(--main-color)/20 disabled:bg-gray-100"
        >
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
          ))}
        </select>
      </div>

      {isLoadingDoctors && <p className="py-8 text-center text-gray-500">Carregando médicos...</p>}
      {!isLoadingDoctors && doctors.length === 0 && <p className="py-8 text-center text-gray-500">Nenhum médico cadastrado.</p>}
      {isLoadingSchedule && <p className="py-8 text-center text-gray-500">Carregando horários...</p>}

      {!isLoadingDoctors && !isLoadingSchedule && selectedDoctorId > 0 && (
        <>
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {daysOfWeek.map((day) => {
              const shifts = weeklySchedule[day.value];

              return (
                <section key={day.value} className="grid gap-4 py-5 md:grid-cols-[12rem_minmax(0,1fr)] md:items-start">
                  <div>
                    <h2 className="font-semibold text-gray-900">{day.label}</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {shifts.length === 0 ? "Sem atendimento" : `${shifts.length} turno${shifts.length === 1 ? "" : "s"}`}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {shifts.map((shift, shiftIndex) => (
                      <div key={`${day.value}-${shiftIndex}`} className="flex flex-wrap items-end gap-3">
                        <label className="block">
                          <span className="mb-1 block text-xs text-gray-500">Início</span>
                          <input
                            type="time"
                            step={1800}
                            value={shift.startTime}
                            aria-label={`${day.label}, turno ${shiftIndex + 1}, início`}
                            onChange={(event) => updateShift(day.value, shiftIndex, "startTime", event.target.value)}
                            className="rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-(--main-color) focus:outline-none focus:ring-2 focus:ring-(--main-color)/20"
                          />
                        </label>
                        <label className="block">
                          <span className="mb-1 block text-xs text-gray-500">Fim</span>
                          <input
                            type="time"
                            step={1800}
                            value={shift.endTime}
                            aria-label={`${day.label}, turno ${shiftIndex + 1}, fim`}
                            onChange={(event) => updateShift(day.value, shiftIndex, "endTime", event.target.value)}
                            className="rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-(--main-color) focus:outline-none focus:ring-2 focus:ring-(--main-color)/20"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => removeShift(day.value, shiftIndex)}
                          disabled={isSaving}
                          aria-label={`Remover turno ${shiftIndex + 1} de ${day.label}`}
                          className="mb-1 px-2 py-1 text-lg text-red-700 hover:bg-red-50 disabled:opacity-50"
                        >
                          ×
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addShift(day.value)}
                      disabled={isSaving || shifts.length >= 4}
                      className="py-1 text-sm font-medium text-teal-800 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      + Adicionar turno
                    </button>
                  </div>
                </section>
              );
            })}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={saveSchedule}
              disabled={isSaving || isLoadingSchedule}
              className="rounded-md bg-(--main-color) px-5 py-2.5 font-semibold text-white transition-colors hover:bg-(--main-light-color) disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? "Salvando..." : "Salvar horários"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}