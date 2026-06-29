import { redirect } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { getSession } from '@/lib/auth/session';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/adm/login');
  }

  return <AdminLayout userName={session.name}>{children}</AdminLayout>;
}
