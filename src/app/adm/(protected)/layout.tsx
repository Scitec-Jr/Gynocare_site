import { redirect } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { getSession } from '@/lib/auth/session';
import { usersRepository } from '@/repositories/users.repository';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/adm/login');
  }

  const user = await usersRepository.findById(session.userId);
  if (!user || !user.Ativo || user.Funcao !== session.role) {
    redirect('/adm/login');
  }

  return <AdminLayout userName={session.name} userRole={session.role}>{children}</AdminLayout>;
}
