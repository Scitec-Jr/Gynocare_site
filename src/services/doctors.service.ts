import { doctorsRepository } from '@/repositories/doctors.repository';

export class DoctorsService {
  async getAllDoctors(
    limit: number = 10,
    offset: number = 0,
    search: string = '',
    examId?: number
  ) {
    const doctors = await doctorsRepository.findAll(
      limit,
      offset,
      search,
      examId
    );

    const total = await doctorsRepository.countAll(
      search,
      examId
    );

    return {
      data: doctors.map(doc => ({
        id: doc.Id,
        name: doc.Nome,
        graduation: '', // Será implementado quando adicionar campo
        createdAt: doc.Criado_em,
        updatedAt: doc.Atualizado_em,
      })),
      total,
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getDoctorById(id: number) {
    const doctor = await doctorsRepository.findById(id);

    if (!doctor) {
      throw new Error('Médico não encontrado');
    }

    return {
      id: doctor.Id,
      name: doctor.Nome,
      createdAt: doctor.Criado_em,
      updatedAt: doctor.Atualizado_em,
    };
  }

  async createDoctor(name: string, graduation: string) {
    if (!name || !graduation) {
      throw new Error('Nome e especialidade são obrigatórios');
    }

    const id = await doctorsRepository.create(name, graduation);

    return { id, name, graduation };
  }

  async updateDoctor(id: number, name: string, graduation: string) {
    if (!name || !graduation) {
      throw new Error('Nome e especialidade são obrigatórios');
    }

    const success = await doctorsRepository.update(id, name);

    if (!success) {
      throw new Error('Falha ao atualizar médico');
    }

    return { id, name, graduation };
  }

  async deleteDoctor(id: number) {
    const success = await doctorsRepository.delete(id);

    if (!success) {
      throw new Error('Falha ao deletar médico');
    }

    return { success: true };
  }
}

export const doctorsService = new DoctorsService();