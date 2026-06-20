import { query, queryOne, execute } from '@/lib/db/connection';

export interface AppointmentRow {
  Id: number;
  Doutor_Id: number;
  Exame_Id: number;
  Data: string;
  Horario_inicio: string;
  Horario_fim: string;
  Telefone: string;
  Criado_em: string;
  Atualizado_em: string;
}

export const appointmentsRepository = {
  async findAll(
    limit: number = 10,
    offset: number = 0,
    search: string = ''
  ): Promise<AppointmentRow[]> {
    const searchTerm = `%${search}%`;
    return query<AppointmentRow>(
      `SELECT * FROM Agendamento 
       WHERE Telefone LIKE ? OR Data LIKE ? 
       ORDER BY Data DESC 
       LIMIT ? OFFSET ?`,
      [searchTerm, searchTerm, limit, offset]
    );
  },

  async countAll(search: string = ''): Promise<number> {
    const searchTerm = `%${search}%`;
    const result = await queryOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM Agendamento WHERE Telefone LIKE ? OR Data LIKE ?',
      [searchTerm, searchTerm]
    );
    return result?.count || 0;
  },

  async findById(id: number): Promise<AppointmentRow | null> {
    return queryOne<AppointmentRow>(
      'SELECT * FROM Agendamento WHERE Id = ?',
      [id]
    );
  },

  async create(
    doctorId: number,
    examId: number,
    date: string,
    startTime: string,
    endTime: string,
    phone: string
  ): Promise<number> {
    const result = await execute(
      `INSERT INTO Agendamento (Doutor_Id, Exame_Id, Data, Horario_inicio, Horario_fim, Telefone) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [doctorId, examId, date, startTime, endTime, phone]
    );
    return result.insertId;
  },

  async update(
    id: number,
    doctorId: number,
    examId: number,
    date: string,
    startTime: string,
    endTime: string,
    phone: string
  ): Promise<boolean> {
    const result = await execute(
      `UPDATE Agendamento 
       SET Doutor_Id = ?, Exame_Id = ?, Data = ?, Horario_inicio = ?, Horario_fim = ?, Telefone = ?, Atualizado_em = NOW() 
       WHERE Id = ?`,
      [doctorId, examId, date, startTime, endTime, phone, id]
    );
    return result.affectedRows > 0;
  },

  async delete(id: number): Promise<boolean> {
    const result = await execute(
      'DELETE FROM Agendamento WHERE Id = ?',
      [id]
    );
    return result.affectedRows > 0;
  },
};
