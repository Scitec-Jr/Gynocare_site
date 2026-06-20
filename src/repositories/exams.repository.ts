import { query, queryOne, execute } from '@/lib/db/connection';

export interface ExamRow {
  Id: number;
  Nome: string;
  Slug: string;
  Information: string;
  Preparation: string;
  Procedimento_Id: number;
  Criado_em: string;
  Atualizado_em: string;
}

export const examsRepository = {
  async findAll(
    limit: number = 10,
    offset: number = 0,
    search: string = '',
    procedureId?: number
  ): Promise<ExamRow[]> {
    const searchTerm = `%${search}%`;

    let sql = `
      SELECT * FROM Exame
      WHERE (Nome LIKE ? OR Slug LIKE ?)
    `;

    const params: (string | number)[] = [searchTerm, searchTerm];

    if (procedureId) {
      sql += ` AND Procedimento_Id = ?`;
      params.push(procedureId);
    }

    sql += `
      ORDER BY Nome ASC
      LIMIT ? OFFSET ?
    `;

    params.push(limit, offset);

    return query<ExamRow>(sql, params);
  },

  async countAll(
    search: string = '',
    procedureId?: number
  ): Promise<number> {
    const searchTerm = `%${search}%`;

    let sql = `
      SELECT COUNT(*) as count
      FROM Exame
      WHERE (Nome LIKE ? OR Slug LIKE ?)
    `;

    const params: (string | number)[] = [searchTerm, searchTerm];

    if (procedureId) {
      sql += ` AND Procedimento_Id = ?`;
      params.push(procedureId);
    }

    const result = await queryOne<{ count: number }>(sql, params);

    return result?.count || 0;
  },

  async findById(id: number): Promise<ExamRow | null> {
    return queryOne<ExamRow>(
      'SELECT * FROM Exame WHERE Id = ?',
      [id]
    );
  },

  async findBySlug(slug: string): Promise<ExamRow | null> {
    return queryOne<ExamRow>(
      'SELECT * FROM Exame WHERE Slug = ?',
      [slug]
    );
  },

  async create(
    name: string,
    slug: string,
    information: string,
    preparation: string,
    procedureId: number
  ): Promise<number> {
    const result = await execute(
      `INSERT INTO Exame (Nome, Slug, Information, Preparation, Procedimento_Id)
       VALUES (?, ?, ?, ?, ?)`,
      [name, slug, information, preparation, procedureId]
    );

    return result.insertId;
  },

  async update(
    id: number,
    name: string,
    slug: string,
    information: string,
    preparation: string,
    procedureId: number
  ): Promise<boolean> {
    const result = await execute(
      `UPDATE Exame
       SET Nome = ?, 
           Slug = ?, 
           Information = ?, 
           Preparation = ?, 
           Procedimento_Id = ?, 
           Atualizado_em = NOW()
       WHERE Id = ?`,
      [name, slug, information, preparation, procedureId, id]
    );

    return result.affectedRows > 0;
  },

  async delete(id: number): Promise<boolean> {
    const result = await execute(
      'DELETE FROM Exame WHERE Id = ?',
      [id]
    );

    return result.affectedRows > 0;
  },
};