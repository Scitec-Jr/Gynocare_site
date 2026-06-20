import AdminLayout from '@/components/admin/AdminLayout';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Add authentication check here
  // If not authenticated, redirect to /adm/login

  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}
