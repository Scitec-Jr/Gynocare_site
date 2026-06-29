'use client';

import { useRouter } from 'next/navigation';

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
  userName?: string;
}

export default function AdminHeader({
  title = 'Painel Administrativo',
  subtitle,
  userName,
}: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/adm/login');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-(--main-dark-color)">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-500 text-sm">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {userName && (
            <span className="hidden sm:block text-sm text-gray-600">
              Olá, <strong>{userName}</strong>
            </span>
          )}
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
