'use client';

import { useState } from 'react';
import Link from 'next/link';

interface NavLink {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

const navLinks: NavLink[] = [
  { label: 'Dashboard', href: '/adm', icon: '📊' },
  { label: 'Médicos', href: '/adm/medicos', icon: '👨‍⚕️' },
  { label: 'Exames', href: '/adm/exames', icon: '🔬' },
  { label: 'Procedimentos', href: '/adm/procedimentos', icon: '⚕️' },
  { label: 'Agendamentos', href: '/adm/agendamentos', icon: '📅' },
  { label: 'Avaliações', href: '/adm/avaliacoes', icon: '⭐' },
  { label: 'Usuários', href: '/adm/usuarios', icon: '👥' },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-20"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen bg-(--main-dark-color) text-white transition-transform duration-300 z-30 md:z-0 ${
          isOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 w-20'
        }`}
      >
        <nav className="flex flex-col h-full pt-24 md:pt-8 px-4 md:px-6 gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-(--main-color) transition-colors duration-200 text-sm md:text-base"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-xl md:text-2xl">{link.icon}</span>
              <span className={`${isOpen ? 'block' : 'hidden'} md:block`}>
                {link.label}
              </span>
              {link.badge && (
                <span className={`ml-auto bg-red-500 rounded-full px-2 py-1 text-xs ${isOpen ? 'block' : 'hidden'} md:block`}>
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 left-8 md:hidden z-40 bg-(--main-color) text-white p-3 rounded-full shadow-lg"
        aria-label="Toggle sidebar"
      >
        {isOpen ? '✕' : '☰'}
      </button>
    </>
  );
}
