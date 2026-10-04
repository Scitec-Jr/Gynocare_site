export const USER_ROLES = ['admin', 'doctor', 'secretary'] as const;
export type UserRole = typeof USER_ROLES[number];

const roleRoutes: Record<UserRole, string[]> = {
  admin: ['/adm'],
  doctor: ['/adm/agendamentos'],
  secretary: [
    '/adm/agendamentos',
    '/adm/avaliacoes',
    '/adm/horarios',
    '/adm/indisponibilidades',
  ],
};

export const roleHome: Record<UserRole, string> = {
  admin: '/adm',
  doctor: '/adm/agendamentos',
  secretary: '/adm/agendamentos',
};

export function canAccessAdminPath(role: UserRole, pathname: string): boolean {
  if (role === 'admin') return true;
  if (pathname === '/adm') return false;

  return roleRoutes[role].some((route) =>
    pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function isUserRole(value: unknown): value is UserRole {
  return typeof value === 'string' && USER_ROLES.includes(value as UserRole);
}