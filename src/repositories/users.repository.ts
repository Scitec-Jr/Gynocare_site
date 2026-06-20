import { query, queryOne, execute } from '@/lib/db/connection';

export interface UserRow {
  Id: number;
  Nome: string;
  Email: string;
  Senha: string;
  Funcao: 'admin' | 'doctor' | 'secretary';
  Ativo: boolean;
  Criado_em: string;
  Atualizado_em: string;
}

export const usersRepository = {
  async findByEmail(email: string): Promise<UserRow | null> {
    return queryOne<UserRow>(
      'SELECT * FROM Usuarios WHERE Email = ?',
      [email]
    );
  },

  async findById(id: number): Promise<UserRow | null> {
    return queryOne<UserRow>(
      'SELECT * FROM Usuarios WHERE Id = ?',
      [id]
    );
  },

  async findAll(
    limit: number = 10,
    offset: number = 0,
    search: string = ''
  ): Promise<UserRow[]> {
    const searchTerm = `%${search}%`;
    return query<UserRow>(
      `SELECT * FROM Usuarios 
       WHERE Nome LIKE ? OR Email LIKE ? 
       ORDER BY Criado_em DESC 
       LIMIT ? OFFSET ?`,
      [searchTerm, searchTerm, limit, offset]
    );
  },

  async countAll(search: string = ''): Promise<number> {
    const searchTerm = `%${search}%`;
    const result = await queryOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM Usuarios WHERE Nome LIKE ? OR Email LIKE ?',
      [searchTerm, searchTerm]
    );
    return result?.count || 0;
  },

  async create(
    name: string,
    email: string,
    passwordHash: string,
    role: 'admin' | 'doctor' | 'secretary' = 'secretary'
  ): Promise<number> {
    const result = await execute(
      `INSERT INTO Usuarios (Nome, Email, Senha, Funcao, Ativo) 
       VALUES (?, ?, ?, ?, TRUE)`,
      [name, email, passwordHash, role]
    );
    return result.insertId;
  },

  async update(
    id: number,
    name: string,
    email: string,
    role: 'admin' | 'doctor' | 'secretary'
  ): Promise<boolean> {
    const result = await execute(
      `UPDATE Usuarios SET Nome = ?, Email = ?, Funcao = ?, Atualizado_em = NOW() 
       WHERE Id = ?`,
      [name, email, role, id]
    );
    return result.affectedRows > 0;
  },

  async updatePassword(id: number, passwordHash: string): Promise<boolean> {
    const result = await execute(
      `UPDATE Usuarios SET Senha = ?, Atualizado_em = NOW() WHERE Id = ?`,
      [passwordHash, id]
    );
    return result.affectedRows > 0;
  },

  async updateStatus(id: number, active: boolean): Promise<boolean> {
    const result = await execute(
      `UPDATE Usuarios SET Ativo = ?, Atualizado_em = NOW() WHERE Id = ?`,
      [active, id]
    );
    return result.affectedRows > 0;
  },

  async delete(id: number): Promise<boolean> {
    const result = await execute(
      'DELETE FROM Usuarios WHERE Id = ?',
      [id]
    );
    return result.affectedRows > 0;
  },
};
