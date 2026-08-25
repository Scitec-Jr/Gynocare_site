import { query, queryOne, execute } from '@/lib/db/connection';

export interface UnavailableDateRow {
  Id: number;
  DoutorId: number;
  DoutorNome: string;
  Data: string;
}

export const unavailableDatesRepository = {
  async findAll(
    limit: number = 10,
    offset: number = 0,
    search: string = ''
  ): Promise<UnavailableDateRow[]> {
    const searchTerm = `%${search}%`;

    return query<UnavailableDateRow>(
      `SELECT DHI.Id, DHI.DoutorId, D.Nome AS DoutorNome, DHI.Data
       FROM DoutorHorarioIndisponivel DHI
       INNER JOIN Doutor D ON D.Id = DHI.DoutorId
       WHERE D.Nome LIKE ? OR DHI.Data LIKE ?
       ORDER BY DHI.Data ASC, D.Nome ASC
       LIMIT ? OFFSET ?`,
      [searchTerm, searchTerm, limit, offset]
    );
  },

  async countAll(search: string = ''): Promise<number> {
    const searchTerm = `%${search}%`;
    const result = await queryOne<{ count: number }>(
      `SELECT COUNT(*) AS count
       FROM DoutorHorarioIndisponivel DHI
       INNER JOIN Doutor D ON D.Id = DHI.DoutorId
       WHERE D.Nome LIKE ? OR DHI.Data LIKE ?`,
      [searchTerm, searchTerm]
    );

    return result?.count || 0;
  },

  async findById(id: number): Promise<UnavailableDateRow | null> {
    return queryOne<UnavailableDateRow>(
      `SELECT DHI.Id, DHI.DoutorId, D.Nome AS DoutorNome, DHI.Data
       FROM DoutorHorarioIndisponivel DHI
       INNER JOIN Doutor D ON D.Id = DHI.DoutorId
       WHERE DHI.Id = ?`,
      [id]
    );
  },

  async create(doctorId: number, date: string): Promise<number> {
    const result = await execute(
      'INSERT INTO DoutorHorarioIndisponivel (DoutorId, Data) VALUES (?, ?)',
      [doctorId, date]
    );

    return result.insertId;
  },

  async update(id: number, doctorId: number, date: string): Promise<boolean> {
    const result = await execute(
      'UPDATE DoutorHorarioIndisponivel SET DoutorId = ?, Data = ? WHERE Id = ?',
      [doctorId, date, id]
    );

    return result.affectedRows > 0;
  },

  async delete(id: number): Promise<boolean> {
    const result = await execute(
      'DELETE FROM DoutorHorarioIndisponivel WHERE Id = ?',
      [id]
    );

    return result.affectedRows > 0;
  },
};
