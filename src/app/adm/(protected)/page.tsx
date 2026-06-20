'use client';

import { useState } from 'react';
import DashboardCard from '@/components/admin/DashboardCard';
import { dashboardModules } from '@/lib/admin/mockData';

export default function AdminDashboard() {
  const [stats] = useState({
    totalAppointments: 24,
    appointmentsToday: 3,
    averageRating: 4.8,
    activeUsers: 12,
  });

  return (
    <div>
      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">
            Agendamentos Totais
          </h3>
          <p className="text-3xl font-bold text-(--main-color)">
            {stats.totalAppointments}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Última atualização: Hoje
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">
            Agendamentos Hoje
          </h3>
          <p className="text-3xl font-bold text-(--secondary-color)">
            {stats.appointmentsToday}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Pendentes para hoje
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">
            Avaliação Média
          </h3>
          <p className="text-3xl font-bold text-yellow-500">
            {stats.averageRating} ⭐
          </p>
          <p className="text-xs text-gray-500 mt-2">
            De 5 estrelas
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">
            Usuários Ativos
          </h3>
          <p className="text-3xl font-bold text-(--main-dark-color)">
            {stats.activeUsers}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Conectados agora
          </p>
        </div>
      </section>

      {/* Modules Grid */}
      <section>
        <h2 className="text-2xl font-bold text-(--main-dark-color) mb-6">
          Módulos de Gestão
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardModules.map((module) => (
            <DashboardCard key={module.id} module={module} />
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-(--main-dark-color) mb-6">
          Atividade Recente
        </h2>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            <div className="p-6 flex items-center gap-4 hover:bg-gray-50 transition">
              <div className="text-2xl">📅</div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  Novo agendamento criado
                </p>
                <p className="text-sm text-gray-500">
                  Agendamento #4 - 18 de junho, 15:00
                </p>
              </div>
              <p className="text-sm text-gray-400">Há 2 horas</p>
            </div>

            <div className="p-6 flex items-center gap-4 hover:bg-gray-50 transition">
              <div className="text-2xl">⭐</div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  Nova avaliação recebida
                </p>
                <p className="text-sm text-gray-500">
                  Avaliação de 5 estrelas do paciente
                </p>
              </div>
              <p className="text-sm text-gray-400">Há 4 horas</p>
            </div>

            <div className="p-6 flex items-center gap-4 hover:bg-gray-50 transition">
              <div className="text-2xl">👨‍⚕️</div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  Novo médico adicionado
                </p>
                <p className="text-sm text-gray-500">
                  Dra. Juliana Oliveira - Especialista
                </p>
              </div>
              <p className="text-sm text-gray-400">Há 6 horas</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
