import mysql from "mysql2/promise";

export async function query<T = Record<string, unknown>>(
	sql: string,
	values: (string | number)[] = []
): Promise<T[]> {
	const connection = await mysql.createConnection({
		host: process.env!.DB_HOST,
		user: process.env!.DB_USER,
		password: process.env!.DB_PASSWORD,
		database: process.env!.DB_NAME,
		port: parseInt(process.env.DB_PORT ?? "3306"),
	});

	try {
		const [results] = await connection.execute(sql, values);
		return results as T[];
	} finally {
		await connection.end();
	}
}
