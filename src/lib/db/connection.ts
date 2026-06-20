/* eslint-disable @typescript-eslint/no-explicit-any */
import mysql, { ResultSetHeader } from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'gynocare',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
});

export async function query<T extends mysql.ResultSetHeader = any>(
  sql: string,
  values?: (string | number | boolean | null)[]
): Promise<T[]> {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query<T[]>(sql, values || []);
    return rows;
  } finally {
    connection.release();
  }
}

export async function queryOne<T extends ResultSetHeader = any>(
  sql: string,
  values?: (string | number | boolean | null)[]
): Promise<T | null> {
  const results = await query<T>(sql, values);
  return results.length > 0 ? results[0] : null;
}

export async function execute(
  sql: string,
  values?: (string | number | boolean | null)[]
): Promise<{ insertId: number; affectedRows: number }> {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(sql, values || []);
    return {
      insertId: (result as any).insertId || 0,
      affectedRows: (result as any).affectedRows || 0,
    };
  } finally {
    connection.release();
  }
}

export async function closePool(): Promise<void> {
  await pool.end();
}

export default pool;
