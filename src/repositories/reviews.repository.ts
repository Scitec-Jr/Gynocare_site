import { query, queryOne, execute } from '@/lib/db/connection';

export interface ReviewRow {
  Id: number;
  Nota: number;
  Texto: string | null;
  Status: boolean;
  Criado_em: string;
  Atualizado_em: string;
}

export const reviewsRepository = {
  async findAll(
    limit: number = 10,
    offset: number = 0,
    status?: boolean
  ): Promise<ReviewRow[]> {
    if (status !== undefined) {
      return query<ReviewRow>(
        `SELECT * FROM Avaliacao WHERE Status = ? ORDER BY Criado_em DESC LIMIT ? OFFSET ?`,
        [status, limit, offset]
      );
    }
    return query<ReviewRow>(
      `SELECT * FROM Avaliacao ORDER BY Criado_em DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    );
  },

  async countAll(status?: boolean): Promise<number> {
    if (status !== undefined) {
      const result = await queryOne<{ count: number }>(
        'SELECT COUNT(*) as count FROM Avaliacao WHERE Status = ?',
        [status]
      );
      return result?.count || 0;
    }
    const result = await queryOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM Avaliacao'
    );
    return result?.count || 0;
  },

  async findById(id: number): Promise<ReviewRow | null> {
    return queryOne<ReviewRow>(
      'SELECT * FROM Avaliacao WHERE Id = ?',
      [id]
    );
  },

  async update(id: number, rating: number, text: string | null, status: boolean): Promise<boolean> {
    const result = await execute(
      `UPDATE Avaliacao SET Nota = ?, Texto = ?, Status = ?, Atualizado_em = NOW() WHERE Id = ?`,
      [rating, text, status, id]
    );
    return result.affectedRows > 0;
  },

  async delete(id: number): Promise<boolean> {
    const result = await execute(
      'DELETE FROM Avaliacao WHERE Id = ?',
      [id]
    );
    return result.affectedRows > 0;
  },

};
