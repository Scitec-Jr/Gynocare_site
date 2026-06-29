'use client';

import { useEffect, useState } from 'react';
import DashboardCard from '@/components/admin/DashboardCard';
import { dashboardModules } from '@/lib/admin/mockData';
import { fetchPaginated } from '@/lib/admin/api';
import { Appointment, Review } from '@/lib/admin/types';
import { formatDate } from '@/lib/admin/utils';

interface DashboardStats {
  totalAppointments: number;
  appointmentsToday: number;
  averageRating: number;
  pendingReviews: number;
  counts: Record<string, number>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentAppointments, setRecentAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const today = new Date().toISOString().split('T')[0];

        const [
          appointmentsRes,
          doctorsRes,
          examsRes,
          proceduresRes,
          reviewsRes,
          usersRes,
          pendingReviewsRes,
        ] = await Promise.all([
          fetchPaginated<Appointment>('/api/agendamentos', { page: 1, limit: 5 }),
          fetchPaginated('/api/doutores', { page: 1, limit: 1 }),
          fetchPaginated('/api/exames', { page: 1, limit: 1 }),
          fetchPaginated('/api/procedimentos', { page: 1, limit: 1 }),
          fetchPaginated<Review>('/api/avaliacoes', { page: 1, limit: 1 }),
          fetchPaginated('/api/usuarios', { page: 1, limit: 1 }),
          fetchPaginated<Review>('/api/avaliacoes', {
            page: 1,
            limit: 200,
            status: 'false',
          }),
        ]);

        const allReviews = await fetchPaginated<Review>('/api/avaliacoes', {
          page: 1,
          limit: 200,
        });
        const published = allReviews.data.filter((r) => r.status);
        const avgRating =
          published.length > 0
            ? published.reduce((sum, r) => sum + r.rating, 0) / published.length
            : 0;

        const todayCount = appointmentsRes.data.filter(
          (a) => a.date.split('T')[0] === today,
        ).length;

        setStats({
          totalAppointments: appointmentsRes.total,
          appointmentsToday: todayCount,
          averageRating: Math.round(avgRating * 10) / 10,
          pendingReviews: pendingReviewsRes.total,
          counts: {
            doctors: doctorsRes.total,
            exams: examsRes.total,
            procedures: proceduresRes.total,
            appointments: appointmentsRes.total,
            reviews: reviewsRes.total,
            users: usersRes.total,
          },
        });

        setRecentAppointments(appointmentsRes.data);
      } catch {
        setStats(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const modules = dashboardModules.map((mod) => ({
    ...mod,
    count: stats?.counts[mod.id] ?? 0,
  }));

  return (
    <div>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          {
            label: 'Agendamentos Totais',
            value: isLoading ? '—' : stats?.totalAppointments ?? 0,
            sub: 'Registros no sistema',
            color: 'text-(--main-color)',
          },
          {
            label: 'Agendamentos Hoje',
            value: isLoading ? '—' : stats?.appointmentsToday ?? 0,
            sub: 'Para hoje',
            color: 'text-(--secondary-color)',
          },
          {
            label: 'Avaliação Média',
            value: isLoading ? '—' : `${stats?.averageRating ?? 0} ★`,
            sub: 'Avaliações publicadas',
            color: 'text-yellow-500',
          },
          {
            label: 'Avaliações Pendentes',
            value: isLoading ? '—' : stats?.pendingReviews ?? 0,
            sub: 'Aguardando moderação',
            color: 'text-(--main-dark-color)',
          },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
          >
            <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
              {card.label}
            </h3>
            <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
            <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
          </div>
        ))}
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-(--main-dark-color) mb-4">
          Módulos de Gestão
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module) => (
            <DashboardCard key={module.id} module={module} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-(--main-dark-color) mb-4">
          Agendamentos Recentes
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-gray-400 text-sm">
              Carregando...
            </div>
          ) : recentAppointments.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">
              Nenhum agendamento registrado
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="px-5 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-(--main-color)/10 flex items-center justify-center text-sm">
                    📅
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-sm">
                      Agendamento #{apt.id}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {formatDate(apt.date)} · {apt.startTime} – {apt.endTime} ·{' '}
                      {apt.phone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
