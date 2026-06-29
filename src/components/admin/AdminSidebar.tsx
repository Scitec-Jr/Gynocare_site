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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Overlay mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-20"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen bg-[var(--main-dark-color)] text-white transition-all duration-300 z-30
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isCollapsed ? 'md:w-20' : 'md:w-64'}
        w-64`}
      >
        <nav className="flex flex-col h-full pt-24 md:pt-8 px-4 md:px-6 gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-[var(--main-color)] transition-colors text-sm md:text-base"
              onClick={() => setIsMobileOpen(false)}
            >
              <span className="text-xl md:text-2xl">{link.icon}</span>

              {!isCollapsed && (
                <span className="md:block">{link.label}</span>
              )}

              {link.badge && !isCollapsed && (
                <span className="ml-auto bg-red-500 rounded-full px-2 py-1 text-xs">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Botão mobile */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed bottom-8 left-8 md:hidden z-40 bg-[var(--main-color)] text-white p-3 rounded-full shadow-lg"
        aria-label="Abrir sidebar"
      >
        ☰
      </button>

      {/* Botão collapse desktop */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden md:flex fixed bottom-8 left-8 z-40 bg-[var(--main-color)] text-white p-3 rounded-full shadow-lg"
        aria-label="Colapsar sidebar"
      >
        {isCollapsed ? '→' : '←'}
      </button>
    </>
  );
}