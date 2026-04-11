"use client";

import { useActionState } from "react";

import { loginAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import {
  initialAdminLoginState,
  type AdminLoginState,
} from "@/lib/admin-login-state";

export function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState<
    AdminLoginState,
    FormData
  >(loginAction, initialAdminLoginState);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-stone-100 px-4 py-12">
      <div className="w-full max-w-[400px] rounded-2xl border border-stone-200/90 bg-white p-8 shadow-lg shadow-stone-200/50">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#126458]">
            IonBATech
          </p>
          <h1 className="mt-2 font-heading text-2xl font-bold tracking-tight text-stone-900">
            Yönetim paneli
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Devam etmek için giriş yapın
          </p>
        </div>

        <form className="space-y-5" action={formAction} noValidate>
          <div className="space-y-2">
            <label
              htmlFor="admin-username"
              className="text-sm font-medium text-stone-800"
            >
              Kullanıcı adı
            </label>
            <input
              id="admin-username"
              name="username"
              type="text"
              autoComplete="username"
              required
              disabled={isPending}
              className="h-11 w-full rounded-lg border border-stone-200 bg-white px-3 text-stone-900 outline-none ring-[#126458]/30 transition-[border-color,box-shadow] placeholder:text-stone-400 focus:border-[#126458] focus:ring-2 disabled:opacity-60"
              placeholder="admin"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="admin-password"
              className="text-sm font-medium text-stone-800"
            >
              Şifre
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={isPending}
              className="h-11 w-full rounded-lg border border-stone-200 bg-white px-3 text-stone-900 outline-none ring-[#126458]/30 transition-[border-color,box-shadow] placeholder:text-stone-400 focus:border-[#126458] focus:ring-2 disabled:opacity-60"
              placeholder="••••••••"
            />
          </div>

          {state.error ? (
            <p
              className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200/80"
              role="alert"
            >
              {state.error}
            </p>
          ) : null}

          <Button
            type="submit"
            disabled={isPending}
            className="h-11 w-full rounded-full bg-[#126458] text-base font-semibold text-white hover:bg-[#0e4d44] disabled:opacity-70"
          >
            {isPending ? "Giriş yapılıyor…" : "Giriş yap"}
          </Button>
        </form>
      </div>
    </div>
  );
}
