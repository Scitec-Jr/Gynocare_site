import { doctorsRepository } from '@/repositories/doctors.repository';
import { unavailableDatesRepository } from '@/repositories/unavailable-dates.repository';

export class UnavailableDatesService {
  async getAll(limit: number = 10, offset: number = 0, search: string = '') {
    const dates = await unavailableDatesRepository.findAll(limit, offset, search);
    const total = await unavailableDatesRepository.countAll(search);

    return {
      data: dates.map((item) => ({
        id: item.Id,
        doctorId: item.DoutorId,
        doctorName: item.DoutorNome,
        date: item.Data,
      })),
      total,
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async create(doctorId: number, date: string) {
    const doctor = await doctorsRepository.findById(doctorId);
    if (!doctor) {
      throw new Error('Médico não encontrado');
    }

    const id = await unavailableDatesRepository.create(doctorId, date);
    return { id, doctorId, date };
  }

  async update(id: number, doctorId: number, date: string) {
    const doctor = await doctorsRepository.findById(doctorId);
    if (!doctor) {
      throw new Error('Médico não encontrado');
    }

    const success = await unavailableDatesRepository.update(id, doctorId, date);
    if (!success) {
      throw new Error('Indisponibilidade não encontrada');
    }

    return { id, doctorId, date };
  }

  async delete(id: number) {
    const success = await unavailableDatesRepository.delete(id);
    if (!success) {
      throw new Error('Indisponibilidade não encontrada');
    }

    return { success: true };
  }
}

export const unavailableDatesService = new UnavailableDatesService();
