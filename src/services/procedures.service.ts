import { proceduresRepository } from '@/repositories/procedures.repository';

export class ProceduresService {
  async getAllProcedures(limit: number = 10, offset: number = 0, search: string = '') {
    const procedures = await proceduresRepository.findAll(limit, offset, search);
    const total = await proceduresRepository.countAll(search);

    return {
      data: procedures.map(proc => ({
        id: proc.Id,
        name: proc.Nome,
        slug: proc.Slug,
        createdAt: proc.Criado_em,
        updatedAt: proc.Atualizado_em,
      })),
      total,
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getProcedureById(id: number) {
    const procedure = await proceduresRepository.findById(id);
    if (!procedure) {
      throw new Error('Procedimento não encontrado');
    }

    return {
      id: procedure.Id,
      name: procedure.Nome,
      slug: procedure.Slug,
      createdAt: procedure.Criado_em,
      updatedAt: procedure.Atualizado_em,
    };
  }

  async createProcedure(name: string, slug: string) {
    if (!name || !slug) {
      throw new Error('Nome e slug são obrigatórios');
    }

    const id = await proceduresRepository.create(name, slug);
    return { id, name, slug };
  }

  async updateProcedure(id: number, name: string, slug: string) {
    if (!name || !slug) {
      throw new Error('Nome e slug são obrigatórios');
    }

    const success = await proceduresRepository.update(id, name, slug);
    if (!success) {
      throw new Error('Falha ao atualizar procedimento');
    }

    return { id, name, slug };
  }

  async deleteProcedure(id: number) {
    const success = await proceduresRepository.delete(id);
    if (!success) {
      throw new Error('Falha ao deletar procedimento');
    }
    return { success: true };
  }
}

export const proceduresService = new ProceduresService();
