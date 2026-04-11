"use client";

import { LayoutDashboard, LogOut, Settings2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { logoutAction } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", label: "Genel bakış", icon: LayoutDashboard },
  { href: "/admin/dashboard/ayarlar", label: "Ayarlar", icon: Settings2 },
] as const;

export function AdminSidebarNav() {
  const pathname = usePathname();

  return (
    <>
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
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-stone-400 transition-colors hover:bg-stone-800 hover:text-white"
          >
            <LogOut className="size-4 shrink-0" aria-hidden />
            Çıkış
          </button>
        </form>
      </div>
    </>
  );
}
