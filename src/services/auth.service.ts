import { usersRepository } from '@/repositories/users.repository';
import { hashPassword, comparePasswords } from '@/lib/auth/passwords';
import { createSessionCookie, deleteSession } from '@/lib/auth/session';

export class AuthService {
  async login(email: string, password: string) {
    // Validação básica
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios');
    }

    // Buscar usuário
    const user = await usersRepository.findByEmail(email);
    if (!user) {
      throw new Error('Email ou senha inválidos');
    }

    // Verificar se usuário está ativo
    if (!user.Ativo) {
      throw new Error('Usuário inativo');
    }

    // Comparar senha
    const isPasswordValid = await comparePasswords(password, user.Senha);
    if (!isPasswordValid) {
      throw new Error('Email ou senha inválidos');
    }

    // Criar sessão
    await createSessionCookie({
      userId: user.Id,
      email: user.Email,
      name: user.Nome,
      role: user.Funcao,
    });

    return {
      id: user.Id,
      email: user.Email,
      name: user.Nome,
      role: user.Funcao,
    };
  }

  async logout() {
    await deleteSession();
  }

  async registerAdmin(
    name: string,
    email: string,
    password: string
  ) {
    // Verificar se email já existe
    const existingUser = await usersRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email já registrado');
    }

    // Hash da senha
    const passwordHash = await hashPassword(password);

    // Criar usuário admin
    const userId = await usersRepository.create(
      name,
      email,
      passwordHash,
      'admin'
    );

    return { id: userId, email, name };
  }
}

export const authService = new AuthService();
