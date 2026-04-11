import { AdminSidebarNav } from "@/components/admin/admin-sidebar-nav";

export function AdminDashboardLayoutUi({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh bg-stone-100">
      <aside className="flex w-56 shrink-0 flex-col border-r border-stone-200 bg-stone-900 text-stone-100">
        <div className="border-b border-stone-700 px-4 py-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6ee7b7]">
            IonBATech
          </p>
          <p className="mt-1 font-heading text-sm font-semibold text-white">
            Yönetim
          </p>
        </div>
        <AdminSidebarNav />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
