import { usersRepository } from '@/repositories/users.repository';
import { hashPassword, comparePasswords } from '@/lib/auth/passwords';

export class UsersService {
  async getAllUsers(limit: number = 10, offset: number = 0, search: string = '') {
    const users = await usersRepository.findAll(limit, offset, search);
    const total = await usersRepository.countAll(search);

    return {
      data: users.map(user => ({
        id: user.Id,
        name: user.Nome,
        email: user.Email,
        role: user.Funcao,
        status: user.Ativo,
        createdAt: user.Criado_em,
        updatedAt: user.Atualizado_em,
      })),
      total,
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getUserById(id: number) {
    const user = await usersRepository.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return {
      id: user.Id,
      name: user.Nome,
      email: user.Email,
      role: user.Funcao,
      status: user.Ativo,
      createdAt: user.Criado_em,
      updatedAt: user.Atualizado_em,
    };
  }

  async createUser(
    name: string,
    email: string,
    password: string,
    role: 'admin' | 'doctor' | 'secretary' = 'secretary'
  ) {
    // Verificar email duplicado
    const existing = await usersRepository.findByEmail(email);
    if (existing) {
      throw new Error('Email já registrado');
    }

    // Hash da senha
    const passwordHash = await hashPassword(password);

    // Criar usuário
    const id = await usersRepository.create(name, email, passwordHash, role);

    return { id, name, email, role };
  }

  async updateUser(
    id: number,
    name: string,
    email: string,
    role: 'admin' | 'doctor' | 'secretary'
  ) {
    // Verificar se email já existe (para outro usuário)
    const existing = await usersRepository.findByEmail(email);
    if (existing && existing.Id !== id) {
      throw new Error('Email já registrado');
    }

    const success = await usersRepository.update(id, name, email, role);
    if (!success) {
      throw new Error('Falha ao atualizar usuário');
    }

    return { id, name, email, role };
  }

  async updatePassword(id: number, currentPassword: string, newPassword: string) {
    // Buscar usuário
    const user = await usersRepository.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verificar senha atual
    const isValid = await comparePasswords(currentPassword, user.Senha);
    if (!isValid) {
      throw new Error('Senha atual inválida');
    }

    // Hash da nova senha
    const newPasswordHash = await hashPassword(newPassword);

    // Atualizar
    const success = await usersRepository.updatePassword(id, newPasswordHash);
    if (!success) {
      throw new Error('Falha ao atualizar senha');
    }

    return { success: true };
  }

  async updateStatus(id: number, active: boolean) {
    const success = await usersRepository.updateStatus(id, active);
    if (!success) {
      throw new Error('Falha ao atualizar status');
    }

    return { success: true };
  }

  async deleteUser(id: number) {
    const success = await usersRepository.delete(id);
    if (!success) {
      throw new Error('Falha ao deletar usuário');
    }
    return { success: true };
  }
}

export const usersService = new UsersService();
