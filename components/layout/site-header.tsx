"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  brandName,
  contactHref,
  logoAlt,
  logoSrc,
  navLinks,
  shopHomeHref,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

function NavAnchor({
  href,
  className,
  children,
  onNavigate,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  onNavigate?: () => void;
}) {
  const external = href.startsWith("http");
  if (external) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
      >
        {children}
      </a>
    );
  }
  return (
    <a href={href} className={className} onClick={onNavigate}>
      {children}
    </a>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [pastBanner, setPastBanner] = useState(false);
  const isHome = pathname === "/";
  /** Video banner üzerindeyken beyaz nav; aşağı kayınca (banner bitti) koyu tipografi */
  const lightOnVideo = isHome && !pastBanner;
  /** Ana sayfada banner geçilince yüzen kapsül yukarı çöküp ince tam genişlik şeridine döner */
  const collapsed = isHome && pastBanner;

  useEffect(() => {
    if (!isHome) {
      setPastBanner(false);
      return;
    }
    const hero = document.getElementById("anasayfa");
    const update = () => {
      if (!hero) return;
      const threshold = 64;
      setPastBanner(hero.getBoundingClientRect().bottom < threshold);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (pathname?.startsWith("/quiz")) {
    return null;
  }

  const outlineBtnClass = cn(
    buttonVariants({ variant: "outline", size: "lg" }),
    "rounded-full font-semibold shadow-sm transition-colors duration-300",
    collapsed ? "h-10 min-h-10 px-5 text-sm" : "h-10 px-6",
    lightOnVideo &&
      "border-white/45 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
    isHome &&
      pastBanner &&
      "border-stone-300/90 bg-white text-[#126458] hover:bg-stone-50",
    !isHome &&
      "border-white/45 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
  );

  const primaryBtnClass = cn(
    buttonVariants({ variant: "default", size: "lg" }),
    "rounded-full border-0 bg-[#126458] font-semibold text-white shadow-md hover:bg-[#0e4d44]",
    collapsed ? "h-10 min-h-10 px-5 text-sm" : "h-10 px-6"
  );

  const navLinkClass = cn(
    "whitespace-nowrap font-medium transition-colors duration-300",
    collapsed ? "text-[14px] lg:text-[15px]" : "text-[15px]",
    lightOnVideo && "text-white hover:text-white/85",
    isHome && pastBanner && "text-stone-900 hover:text-[#126458]",
    !isHome && "text-white hover:text-white/85"
  );

  const menuBtnClass = cn(
    "shrink-0 transition-colors duration-300 md:hidden",
    lightOnVideo && "text-white hover:bg-white/10",
    isHome && pastBanner && "text-stone-900 hover:bg-stone-200/60",
    !isHome && "text-white hover:bg-white/10"
  );

  return (
    <header
      className={cn(
        "z-[100] w-full transition-[padding] duration-300 ease-out",
        isHome && !pastBanner && "fixed top-0 p-4 sm:p-5",
        isHome && pastBanner && "fixed top-0 p-0",
        !isHome && "sticky top-0 p-0"
      )}
    >
      <nav
        className={cn(
          "mx-auto backdrop-blur-md transition-[background-color,border-color,box-shadow,border-radius,max-width,padding] duration-300 ease-out",
          isHome &&
            lightOnVideo &&
            "max-w-[1300px] rounded-2xl border border-white/20 bg-white/20 px-4 py-2.5 shadow-lg sm:px-8 sm:py-3",
          collapsed &&
            "w-full max-w-none rounded-none border-x-0 border-t-0 border-b border-stone-200/90 bg-white/95 px-4 py-3 shadow-md sm:px-6 sm:py-3.5",
          !isHome &&
            "w-full max-w-none rounded-none border-x-0 border-t-0 border-b border-white/15 bg-slate-950/80 px-4 py-3.5 shadow-lg sm:px-6 sm:py-4"
        )}
        aria-label="Ana navigasyon"
      >
        <div
          className={cn(
            "mx-auto flex w-full items-center justify-between",
            collapsed ? "max-w-[1300px] gap-2 sm:gap-3" : "max-w-[1300px] gap-3"
          )}
        >
          <Link
            href="/"
            className={cn(
              "relative flex shrink-0 items-center",
              collapsed
                ? "h-10 w-[9.25rem] sm:h-11 sm:w-[10.5rem]"
                : "h-10 w-[9.5rem] sm:h-11 sm:w-[11rem]"
            )}
          >
            <Image
              src={logoSrc}
              alt={logoAlt}
              fill
              className={cn(
                "object-contain object-left transition-[filter] duration-300",
                lightOnVideo && "brightness-0 invert",
                !isHome && "brightness-0 invert",
              )}
              sizes="(max-width: 640px) 152px, 176px"
              priority
            />
            <span className="sr-only">{brandName}</span>
          </Link>

          <div className="hidden items-center md:flex md:gap-4 lg:gap-6">
            <ul
              className={cn(
                "flex items-center",
                collapsed ? "gap-3 lg:gap-4" : "gap-5 lg:gap-6"
              )}
            >
              {navLinks.map((link) => (
                <li key={link.href + link.label}>
                  <NavAnchor href={link.href} className={navLinkClass}>
                    {link.label}
                  </NavAnchor>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={cn(
              "hidden items-center md:flex",
              collapsed ? "gap-1.5 sm:gap-2" : "gap-2 sm:gap-3"
            )}
          >
            <NavAnchor href={shopHomeHref} className={outlineBtnClass}>
              Mağaza
            </NavAnchor>
            <NavAnchor href={contactHref} className={primaryBtnClass}>
              <span className="flex items-center gap-1.5">
                Teklif Al
                <ArrowRight className="size-4 opacity-90" aria-hidden />
              </span>
            </NavAnchor>
          </div>

          <Button
            variant="ghost"
            size="icon-lg"
            className={menuBtnClass}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>
      </nav>

      {open ? (
        <div
          id="mobile-nav"
          className={cn(
            "p-4 shadow-md backdrop-blur-md transition-[margin,border-radius] duration-300 ease-out md:hidden",
            collapsed &&
              "mt-0 rounded-none border-x-0 border-t-0 border-b border-stone-200/90 bg-white/98",
            isHome &&
              lightOnVideo &&
              "mt-2 mx-0 rounded-2xl border border-white/20 bg-slate-950/90",
            !isHome &&
              "mt-2 mx-4 rounded-2xl border border-white/20 bg-slate-950/90"
          )}
        >
          <ul className="space-y-0.5">
            {navLinks.map((link) => (
              <li key={link.href + link.label}>
                <NavAnchor
                  href={link.href}
                  className={cn(
                    "block rounded-xl py-2.5 text-base font-medium transition-colors duration-300",
                    isHome && pastBanner
                      ? "text-stone-900 hover:text-[#126458]"
                      : "text-white hover:text-white/85"
                  )}
                  onNavigate={() => setOpen(false)}
                >
                  {link.label}
                </NavAnchor>
              </li>
            ))}
          </ul>
          <div
            className={cn(
              "mt-4 space-y-3 border-t pt-4",
              isHome && pastBanner ? "border-stone-200" : "border-white/15"
            )}
          >
            <NavAnchor
              href={shopHomeHref}
              className={cn(
                outlineBtnClass,
                "flex h-11 w-full justify-center"
              )}
              onNavigate={() => setOpen(false)}
            >
              Mağaza
            </NavAnchor>
            <NavAnchor
              href={contactHref}
              className={cn(
                primaryBtnClass,
                "flex h-11 w-full items-center justify-center gap-2"
              )}
              onNavigate={() => setOpen(false)}
            >
              Teklif Al
              <ArrowRight className="size-4" aria-hidden />
            </NavAnchor>
          </div>
        </div>
      ) : null}
    </header>
  );
}
