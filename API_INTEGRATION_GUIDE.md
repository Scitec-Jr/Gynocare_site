// Exemplo de integração com API
// Este arquivo mostra como integrar os endpoints da API com os componentes admin

// 1. Criar um hook customizado para fetch
// src/lib/admin/hooks/useApi.ts

import { useState, useCallback } from 'react';

interface UseApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
}

export function useApi<T>(url: string, options: UseApiOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const request = useCallback(
    async (customOptions?: UseApiOptions) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          method: options.method || customOptions?.method || 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            options.body || customOptions?.body
          ),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
        return result;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [url, options]
  );

  return { data, error, isLoading, request };
}

// 2. Exemplo de uso em um componente CRUD

/*
'use client';

import { useApi } from '@/lib/admin/hooks/useApi';
import { Doctor } from '@/lib/admin/types';
import { useEffect, useState } from 'react';
import AdminTable from '@/components/admin/AdminTable';

export default function DoctorsPageWithApi() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const { data, isLoading, request } = useApi<Doctor[]>('/api/doutores');

  useEffect(() => {
    request().then((result) => setDoctors(result));
  }, [request]);

  const handleCreate = async (doctor: Omit<Doctor, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newDoctor = await fetch('/api/doutores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doctor),
      }).then((r) => r.json());

      setDoctors([...doctors, newDoctor]);
    } catch (error) {
      console.error('Failed to create doctor:', error);
    }
  };

  const handleUpdate = async (id: number, doctor: Partial<Doctor>) => {
    try {
      const updated = await fetch(`/api/doutores/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doctor),
      }).then((r) => r.json());

      setDoctors(doctors.map((d) => (d.id === id ? updated : d)));
    } catch (error) {
      console.error('Failed to update doctor:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/doutores/${id}`, { method: 'DELETE' });
      setDoctors(doctors.filter((d) => d.id !== id));
    } catch (error) {
      console.error('Failed to delete doctor:', error);
    }
  };

  return (
    <AdminTable
      columns={columns}
      data={doctors}
      isLoading={isLoading}
      onEdit={(doctor) => handleUpdate(doctor.id, doctor)}
      onDelete={(doctor) => handleDelete(doctor.id)}
    />
  );
}
*/

// 3. Atualizar endpoints esperados

/*
Endpoints necessários para integração completa:

GET /api/doutores - Listar médicos
POST /api/doutores - Criar médico
PUT /api/doutores/:id - Atualizar médico
DELETE /api/doutores/:id - Deletar médico

GET /api/exames - Listar exames
POST /api/exames - Criar exame
PUT /api/exames/:id - Atualizar exame
DELETE /api/exames/:id - Deletar exame

GET /api/procedimentos - Listar procedimentos
POST /api/procedimentos - Criar procedimento
PUT /api/procedimentos/:id - Atualizar procedimento
DELETE /api/procedimentos/:id - Deletar procedimento

GET /api/agendamentos - Listar agendamentos
POST /api/agendamentos - Criar agendamento
PUT /api/agendamentos/:id - Atualizar agendamento
DELETE /api/agendamentos/:id - Deletar agendamento

GET /api/avaliacoes - Listar avaliações
PUT /api/avaliacoes/:id - Atualizar avaliação
DELETE /api/avaliacoes/:id - Deletar avaliação

GET /api/usuarios - Listar usuários
POST /api/usuarios - Criar usuário
PUT /api/usuarios/:id - Atualizar usuário
DELETE /api/usuarios/:id - Deletar usuário
*/

// 4. Estrutura recomendada de resposta API

/*
{
  "success": true,
  "data": { /* objeto ou array */ },
  "error": null,
  "message": "Operação realizada com sucesso"
}

Em caso de erro:
{
  "success": false,
  "data": null,
  "error": "Descrição do erro",
  "message": "Não foi possível completar a operação"
}
*/

// 5. Implementar tratamento de erros global

/*
src/lib/admin/api.ts

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
  }
}

export async function apiRequest<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, data.message || 'API Error', data);
  }

  return data;
}
*/

// 6. Criar contexto de autenticação (opcional)

/*
src/contexts/AuthContext.tsx

'use client';

import { createContext, useContext, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'secretary';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    setUser(data.user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
*/

export default {};
