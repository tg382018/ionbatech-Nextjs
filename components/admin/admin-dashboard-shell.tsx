"use client";

import { LayoutDashboard, LogOut, Settings2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { clearAdminSession, readAdminSession } from "@/lib/admin-auth";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", label: "Genel bakış", icon: LayoutDashboard },
  { href: "/admin/dashboard/ayarlar", label: "Ayarlar", icon: Settings2 },
] as const;

export function AdminDashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const ok = readAdminSession();
    setAuthorized(ok);
    setReady(true);
    if (!ok) {
      router.replace("/admin");
    }
  }, [router]);

  function handleLogout() {
    clearAdminSession();
    router.replace("/admin");
  }

  if (!ready) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-stone-100 text-sm text-stone-500">
        Yükleniyor…
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

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
        <nav className="flex flex-1 flex-col gap-0.5 p-3">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-[#126458] text-white"
                    : "text-stone-300 hover:bg-stone-800 hover:text-white"
                )}
              >
                <Icon className="size-4 shrink-0 opacity-90" aria-hidden />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-stone-700 p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-stone-400 transition-colors hover:bg-stone-800 hover:text-white"
          >
            <LogOut className="size-4 shrink-0" aria-hidden />
            Çıkış
          </button>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
