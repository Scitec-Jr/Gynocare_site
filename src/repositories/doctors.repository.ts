import { query, queryOne, execute } from '@/lib/db/connection';

export interface DoctorRow {
  Id: number;
  Nome: string;
  Criado_em: string;
  Atualizado_em: string;
}

export const doctorsRepository = {
  async findAll(
    limit: number = 10,
    offset: number = 0,
    search: string = '',
    examId?: number
  ): Promise<DoctorRow[]> {
    const searchTerm = `%${search}%`;

    let sql = `
      SELECT DISTINCT D.*
      FROM Doutor D
      WHERE D.Nome LIKE ?
    `;

    const params: (string | number)[] = [searchTerm];

    if (examId) {
      sql = `
        SELECT DISTINCT D.*
        FROM Doutor D
        INNER JOIN Doutor_Exame DE ON D.Id = DE.Doutor_Id
        WHERE D.Nome LIKE ?
        AND DE.Exame_Id = ?
      `;

      params.push(examId);
    }

    sql += `
      ORDER BY D.Nome ASC
      LIMIT ? OFFSET ?
    `;

    params.push(limit, offset);

    return query<DoctorRow>(sql, params);
  },

  async countAll(
    search: string = '',
    examId?: number
  ): Promise<number> {
    const searchTerm = `%${search}%`;

    let sql = `
      SELECT COUNT(DISTINCT D.Id) as count
      FROM Doutor D
      WHERE D.Nome LIKE ?
    `;

    const params: (string | number)[] = [searchTerm];

    if (examId) {
      sql = `
        SELECT COUNT(DISTINCT D.Id) as count
        FROM Doutor D
        INNER JOIN Doutor_Exame DE ON D.Id = DE.Doutor_Id
        WHERE D.Nome LIKE ?
        AND DE.Exame_Id = ?
      `;

      params.push(examId);
    }

    const result = await queryOne<{ count: number }>(sql, params);

    return result?.count || 0;
  },

  async findById(id: number): Promise<DoctorRow | null> {
    return queryOne<DoctorRow>(
      'SELECT * FROM Doutor WHERE Id = ?',
      [id]
    );
  },

  async create(name: string, specialty: string): Promise<number> {
    const result = await execute(
      'INSERT INTO Doutor (Nome) VALUES (?)',
      [name]
    );

    return result.insertId;
  },

  async update(id: number, name: string): Promise<boolean> {
    const result = await execute(
      'UPDATE Doutor SET Nome = ?, Atualizado_em = NOW() WHERE Id = ?',
      [name, id]
    );

    return result.affectedRows > 0;
  },

  async delete(id: number): Promise<boolean> {
    const result = await execute(
      'DELETE FROM Doutor WHERE Id = ?',
      [id]
    );

    return result.affectedRows > 0;
  },
};