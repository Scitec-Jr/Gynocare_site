import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  userName?: string;
}

export default function AdminLayout({
  children,
  title,
  subtitle,
  userName,
}: AdminLayoutProps) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title={title} subtitle={subtitle} userName={userName} />

        <main className="flex-1 p-4 md:p-8 max-w-360 w-full mx-auto">
          {children}
        </main>

        <AdminFooter />
      </div>
    </div>
  );
}
