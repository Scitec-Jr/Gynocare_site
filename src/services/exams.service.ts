import { examsRepository } from '@/repositories/exams.repository';
import { proceduresRepository } from '@/repositories/procedures.repository';

export class ExamsService {
  async getAllExams(
    limit: number = 10,
    offset: number = 0,
    search: string = '',
    procedureId?: number
  ) {
    const exams = await examsRepository.findAll(
      limit,
      offset,
      search,
      procedureId
    );

    const total = await examsRepository.countAll(
      search,
      procedureId
    );

    return {
      data: exams.map(exam => ({
        id: exam.Id,
        name: exam.Nome,
        slug: exam.Slug,
        information: exam.Information,
        preparation: exam.Preparation,
        procedureId: exam.Procedimento_Id,
        createdAt: exam.Criado_em,
        updatedAt: exam.Atualizado_em,
      })),
      total,
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getExamById(id: number) {
    const exam = await examsRepository.findById(id);

    if (!exam) {
      throw new Error('Exame não encontrado');
    }

    return {
      id: exam.Id,
      name: exam.Nome,
      slug: exam.Slug,
      information: exam.Information,
      preparation: exam.Preparation,
      procedureId: exam.Procedimento_Id,
      createdAt: exam.Criado_em,
      updatedAt: exam.Atualizado_em,
    };
  }

  async createExam(
    name: string,
    slug: string,
    information: string,
    preparation: string,
    procedureId: number
  ) {
    // Validar procedimento existe
    const procedure = await proceduresRepository.findById(procedureId);

    if (!procedure) {
      throw new Error('Procedimento não encontrado');
    }

    // Verificar slug duplicado
    const existing = await examsRepository.findBySlug(slug);

    if (existing) {
      throw new Error('Slug já existe');
    }

    const id = await examsRepository.create(
      name,
      slug,
      information,
      preparation,
      procedureId
    );

    return {
      id,
      name,
      slug,
      information,
      preparation,
      procedureId,
    };
  }

  async updateExam(
    id: number,
    name: string,
    slug: string,
    information: string,
    preparation: string,
    procedureId: number
  ) {
    // Verificar procedimento
    const procedure = await proceduresRepository.findById(procedureId);

    if (!procedure) {
      throw new Error('Procedimento não encontrado');
    }

    // Verificar slug duplicado (exceto o atual)
    const existingExam = await examsRepository.findBySlug(slug);

    if (existingExam && existingExam.Id !== id) {
      throw new Error('Slug já existe');
    }

    const success = await examsRepository.update(
      id,
      name,
      slug,
      information,
      preparation,
      procedureId
    );

    if (!success) {
      throw new Error('Falha ao atualizar exame');
    }

    return {
      id,
      name,
      slug,
      information,
      preparation,
      procedureId,
    };
  }

  async deleteExam(id: number) {
    const success = await examsRepository.delete(id);

    if (!success) {
      throw new Error('Falha ao deletar exame');
    }

    return {
      success: true,
    };
  }
}

export const examsService = new ExamsService();