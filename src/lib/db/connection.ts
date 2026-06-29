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

export async function query<T = unknown>(
  sql: string,
  values?: (string | number | boolean | null)[]
): Promise<T[]> {
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.query(sql, values || []);
    return rows as T[];
  } finally {
    connection.release();
  }
}

export async function queryOne<T = unknown>(
  sql: string,
  values?: (string | number | boolean | null)[]
): Promise<T | null> {
  const results = await query<T>(sql, values);
  return results.length > 0 ? results[0] : null;
}

export async function execute(
  sql: string,
  values?: (string | number | boolean | null)[]
): Promise<ResultSetHeader> {
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.query<ResultSetHeader>(sql, values || []);
    return result;
  } finally {
    connection.release();
  }
}

export async function closePool(): Promise<void> {
  await pool.end();
}

export default pool;