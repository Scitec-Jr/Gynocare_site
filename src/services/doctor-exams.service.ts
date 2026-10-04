import { doctorsRepository } from '@/repositories/doctors.repository';
import { doctorExamsRepository } from '@/repositories/doctor-exams.repository';
import { examsRepository } from '@/repositories/exams.repository';

export class DoctorExamsService {
  async getExamIds(doctorId: number) {
    const doctor = await doctorsRepository.findById(doctorId);
    if (!doctor) throw new Error('Médico não encontrado');

    return {
      doctorId,
      examIds: await doctorExamsRepository.findExamIdsByDoctor(doctorId),
    };
  }

  async replaceExams(doctorId: number, examIds: number[]) {
    const doctor = await doctorsRepository.findById(doctorId);
    if (!doctor) throw new Error('Médico não encontrado');

    const existingExamIds = await examsRepository.findExistingIds(examIds);
    if (existingExamIds.length !== examIds.length) {
      throw new Error('Um ou mais exames selecionados não existem');
    }

    await doctorExamsRepository.replaceForDoctor(doctorId, examIds);
    return this.getExamIds(doctorId);
  }
}

export const doctorExamsService = new DoctorExamsService();