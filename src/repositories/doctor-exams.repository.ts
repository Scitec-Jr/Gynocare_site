import pool, { query } from '@/lib/db/connection';

export const doctorExamsRepository = {
  async findExamIdsByDoctor(doctorId: number): Promise<number[]> {
    const rows = await query<{ Exame_Id: number }>(
      'SELECT Exame_Id FROM Doutor_Exame WHERE Doutor_Id = ? ORDER BY Exame_Id ASC',
      [doctorId],
    );
    return rows.map((row) => row.Exame_Id);
  },

  async replaceForDoctor(doctorId: number, examIds: number[]): Promise<void> {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();
      await connection.execute('DELETE FROM Doutor_Exame WHERE Doutor_Id = ?', [doctorId]);

      if (examIds.length > 0) {
        const placeholders = examIds.map(() => '(?, ?)').join(', ');
        const values = examIds.flatMap((examId) => [doctorId, examId]);
        await connection.execute(
          `INSERT INTO Doutor_Exame (Doutor_Id, Exame_Id) VALUES ${placeholders}`,
          values,
        );
      }

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },
};