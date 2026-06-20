import Link from 'next/link';
import { DashboardModule } from '@/lib/admin/types';

interface DashboardCardProps {
  module: DashboardModule;
}

export default function DashboardCard({ module }: DashboardCardProps) {
  return (
    <Link href={module.href}>
      <div className={`${module.color} rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition-shadow cursor-pointer h-full`}>
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{module.icon}</div>
          {module.count !== undefined && (
            <div className="bg-white bg-opacity-30 rounded-full px-3 py-1">
              <span className="text-2xl font-bold">{module.count}</span>
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold mb-2">{module.title}</h3>
        <p className="text-sm opacity-90">{module.description}</p>

        <div className="mt-4 text-sm font-semibold opacity-75">
          Gerenciar →
        </div>
      </div>
    </Link>
  );
}
