import { appointmentsRepository } from '@/repositories/appointments.repository';
import { doctorsRepository } from '@/repositories/doctors.repository';
import { examsRepository } from '@/repositories/exams.repository';

export class AppointmentsService {
  async getAllAppointments(limit: number = 10, offset: number = 0, search: string = '') {
    const appointments = await appointmentsRepository.findAll(limit, offset, search);
    const total = await appointmentsRepository.countAll(search);

    return {
      data: appointments.map(apt => ({
        id: apt.Id,
        doctorId: apt.Doutor_Id,
        examId: apt.Exame_Id,
        date: apt.Data,
        startTime: apt.Horario_inicio,
        endTime: apt.Horario_fim,
        phone: apt.Telefone,
        createdAt: apt.Criado_em,
        updatedAt: apt.Atualizado_em,
      })),
      total,
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getAppointmentById(id: number) {
    const appointment = await appointmentsRepository.findById(id);
    if (!appointment) {
      throw new Error('Agendamento não encontrado');
    }

    return {
      id: appointment.Id,
      doctorId: appointment.Doutor_Id,
      examId: appointment.Exame_Id,
      date: appointment.Data,
      startTime: appointment.Horario_inicio,
      endTime: appointment.Horario_fim,
      phone: appointment.Telefone,
      createdAt: appointment.Criado_em,
      updatedAt: appointment.Atualizado_em,
    };
  }

  async createAppointment(
    doctorId: number,
    examId: number,
    date: string,
    startTime: string,
    endTime: string,
    phone: string
  ) {
    // Validar médico existe
    const doctor = await doctorsRepository.findById(doctorId);
    if (!doctor) {
      throw new Error('Médico não encontrado');
    }

    // Validar exame existe
    const exam = await examsRepository.findById(examId);
    if (!exam) {
      throw new Error('Exame não encontrado');
    }

    const id = await appointmentsRepository.create(
      doctorId,
      examId,
      date,
      startTime,
      endTime,
      phone
    );

    return { id, doctorId, examId, date, startTime, endTime, phone };
  }

  async updateAppointment(
    id: number,
    doctorId: number,
    examId: number,
    date: string,
    startTime: string,
    endTime: string,
    phone: string
  ) {
    // Validações
    const doctor = await doctorsRepository.findById(doctorId);
    if (!doctor) {
      throw new Error('Médico não encontrado');
    }

    const exam = await examsRepository.findById(examId);
    if (!exam) {
      throw new Error('Exame não encontrado');
    }

    const success = await appointmentsRepository.update(
      id,
      doctorId,
      examId,
      date,
      startTime,
      endTime,
      phone
    );

    if (!success) {
      throw new Error('Falha ao atualizar agendamento');
    }

    return { id, doctorId, examId, date, startTime, endTime, phone };
  }

  async deleteAppointment(id: number) {
    const success = await appointmentsRepository.delete(id);
    if (!success) {
      throw new Error('Falha ao deletar agendamento');
    }
    return { success: true };
  }
}

export const appointmentsService = new AppointmentsService();
