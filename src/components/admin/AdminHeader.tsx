import Link from 'next/link';

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
}

export default function AdminHeader({ title = 'Painel Administrativo', subtitle }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-(--main-dark-color)">{title}</h1>
          {subtitle && <p className="text-gray-600 text-sm md:text-base">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            🔔
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            ⚙️
          </button>
          <button className="p-2 rounded-lg hover:bg-red-100 transition-colors text-red-600">
            🚪
          </button>
        </div>
      </div>
    </header>
  );
}
