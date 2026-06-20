import { query, queryOne, execute } from '@/lib/db/connection';

export interface ProcedureRow {
  Id: number;
  Nome: string;
  Slug: string;
  Criado_em: string;
  Atualizado_em: string;
}

export const proceduresRepository = {
  async findAll(
    limit: number = 10,
    offset: number = 0,
    search: string = ''
  ): Promise<ProcedureRow[]> {
    const searchTerm = `%${search}%`;
    return query<ProcedureRow>(
      `SELECT * FROM Procedimento 
       WHERE Nome LIKE ? OR Slug LIKE ? 
       ORDER BY Nome ASC 
       LIMIT ? OFFSET ?`,
      [searchTerm, searchTerm, limit, offset]
    );
  },

  async countAll(search: string = ''): Promise<number> {
    const searchTerm = `%${search}%`;
    const result = await queryOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM Procedimento WHERE Nome LIKE ? OR Slug LIKE ?',
      [searchTerm, searchTerm]
    );
    return result?.count || 0;
  },

  async findById(id: number): Promise<ProcedureRow | null> {
    return queryOne<ProcedureRow>(
      'SELECT * FROM Procedimento WHERE Id = ?',
      [id]
    );
  },

  async create(name: string, slug: string): Promise<number> {
    const result = await execute(
      'INSERT INTO Procedimento (Nome, Slug) VALUES (?, ?)',
      [name, slug]
    );
    return result.insertId;
  },

  async update(id: number, name: string, slug: string): Promise<boolean> {
    const result = await execute(
      'UPDATE Procedimento SET Nome = ?, Slug = ?, Atualizado_em = NOW() WHERE Id = ?',
      [name, slug, id]
    );
    return result.affectedRows > 0;
  },

  async delete(id: number): Promise<boolean> {
    const result = await execute(
      'DELETE FROM Procedimento WHERE Id = ?',
      [id]
    );
    return result.affectedRows > 0;
  },
};
