import DashboardNav from '@/components/dashboard-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Sidebar */}
      <DashboardNav />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 overflow-auto">
        <div className="pt-4 px-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
