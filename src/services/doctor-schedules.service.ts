import { doctorsRepository } from '@/repositories/doctors.repository';
import { doctorSchedulesRepository, type DoctorScheduleInput } from '@/repositories/doctor-schedules.repository';

export class DoctorSchedulesService {
  async getByDoctor(doctorId: number) {
    const doctor = await doctorsRepository.findById(doctorId);
    if (!doctor) throw new Error('Médico não encontrado');

    const schedules = await doctorSchedulesRepository.findByDoctor(doctorId);
    return {
      doctorId,
      schedules: schedules.map((schedule) => ({
        dayOfWeek: schedule.DiaSemana,
        startTime: schedule.HoraInicio,
        endTime: schedule.HoraFim,
      })),
    };
  }

  async replaceForDoctor(doctorId: number, schedules: DoctorScheduleInput[]) {
    const doctor = await doctorsRepository.findById(doctorId);
    if (!doctor) throw new Error('Médico não encontrado');

    await doctorSchedulesRepository.replaceForDoctor(doctorId, schedules);
    return this.getByDoctor(doctorId);
  }
}

export const doctorSchedulesService = new DoctorSchedulesService();