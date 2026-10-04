import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import { AdminRoleProvider } from './AdminRoleContext';
import type { UserRole } from '@/lib/auth/roles';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  userName?: string;
  userRole: UserRole;
}

export default function AdminLayout({
  children,
  title,
  subtitle,
  userName,
  userRole,
}: AdminLayoutProps) {
  return (
    <AdminRoleProvider role={userRole}>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <AdminSidebar role={userRole} />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title={title} subtitle={subtitle} userName={userName} />

        <main className="flex-1 p-4 md:p-8 max-w-480 w-full mx-auto">
          {children}
        </main>

        <AdminFooter />
      </div>
      </div>
    </AdminRoleProvider>
  );
}
