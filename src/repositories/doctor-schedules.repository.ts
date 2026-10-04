import pool, { query } from '@/lib/db/connection';

export interface DoctorScheduleRow {
  Id: number;
  DoutorId: number;
  DiaSemana: number;
  HoraInicio: string;
  HoraFim: string;
}

export interface DoctorScheduleInput {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export const doctorSchedulesRepository = {
  async findByDoctor(doctorId: number): Promise<DoctorScheduleRow[]> {
    return query<DoctorScheduleRow>(
      `SELECT Id, DoutorId, DiaSemana,
              TIME_FORMAT(HoraInicio, '%H:%i') AS HoraInicio,
              TIME_FORMAT(HoraFim, '%H:%i') AS HoraFim
       FROM DoutorHorario
       WHERE DoutorId = ?
       ORDER BY DiaSemana ASC, HoraInicio ASC`,
      [doctorId],
    );
  },

  async replaceForDoctor(doctorId: number, schedules: DoctorScheduleInput[]): Promise<void> {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();
      await connection.execute('DELETE FROM DoutorHorario WHERE DoutorId = ?', [doctorId]);

      if (schedules.length > 0) {
        const values = schedules.flatMap((schedule) => [
          doctorId,
          schedule.dayOfWeek,
          schedule.startTime,
          schedule.endTime,
        ]);
        const placeholders = schedules.map(() => '(?, ?, ?, ?)').join(', ');

        await connection.execute(
          `INSERT INTO DoutorHorario (DoutorId, DiaSemana, HoraInicio, HoraFim)
           VALUES ${placeholders}`,
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