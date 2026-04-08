import { Separator } from "@/components/ui/separator";
import {
  brandName,
  contactHref,
  footerContent,
  shopHomeHref,
} from "@/lib/constants";

import { Container } from "./container";

export function SiteFooter() {
  return (
    <footer
      id="iletisim"
      className="relative overflow-hidden border-t-2 border-primary/45 bg-gradient-to-b from-white via-emerald-50/35 to-white text-stone-800"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center overflow-hidden"
        aria-hidden
      >
        <span
          className="translate-y-2 font-heading text-[clamp(3.5rem,16vw,11rem)] font-extrabold leading-none tracking-tighter text-primary/[0.07] sm:translate-y-4 sm:text-[clamp(4.5rem,18vw,13rem)]"
        >
          {brandName}
        </span>
      </div>
      <Container className="relative z-10 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <p className="font-heading text-lg font-semibold tracking-tight text-primary">
              {brandName}
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-stone-600">
              {footerContent.tagline}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">Hızlı linkler</p>
            <ul className="mt-4 space-y-2 text-sm text-stone-600">
              {footerContent.quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-primary">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={shopHomeHref}
                  className="transition-colors hover:text-primary"
                >
                  Mağaza
                </a>
              </li>
              <li>
                <a
                  href={contactHref}
                  className="transition-colors hover:text-primary"
                >
                  İletişim / Teklif
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">Kategoriler</p>
            <ul className="mt-4 space-y-2 text-sm text-stone-600">
              {footerContent.categoryLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="transition-colors hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">
              {footerContent.contact.title}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-stone-600">
              {footerContent.contact.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <ul className="mt-4 flex flex-wrap gap-3 text-sm">
              {footerContent.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-stone-600 transition-colors hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Separator className="my-10 bg-primary/15" />
        <p className="text-center text-xs text-stone-500">
          {footerContent.legal}
        </p>
      </Container>
    </footer>
  );
}
