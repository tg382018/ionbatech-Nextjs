import { systemArchitectureSection } from "@/lib/constants";

import { Container } from "../layout/container";
import { AnimatedReveal } from "../ui/animated-reveal";
import { SystemEnergyHubDiagram } from "../ui/system-energy-hub-diagram";

export function SystemArchitectureSection() {
  const s = systemArchitectureSection;

  return (
    <section
      id={s.id}
      className="relative scroll-mt-24 overflow-hidden border-t border-border py-14 sm:py-20"
      aria-labelledby="architecture-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-50/90 via-background to-muted/40 dark:from-muted/20 dark:via-background dark:to-muted/30"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,oklch(0.96_0.02_200_/_0.5),transparent_55%)]"
        aria-hidden
      />

      <Container className="relative">
        <div className="mx-auto max-w-6xl">
          {/* Üst: bölüm başlığı */}
          <header className="mx-auto max-w-3xl text-center sm:text-left">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-800 dark:text-sky-300">
              <span className="size-1.5 rounded-full bg-sky-500" aria-hidden />
              Merkezi sistem
            </span>
            <h2
              id="architecture-heading"
              className="mt-3 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
            >
              {s.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {s.subtitle}
            </p>
          </header>

          <AnimatedReveal>
            <div className="mt-10 flex flex-col gap-10 sm:mt-12 sm:gap-12 lg:gap-14">
              {/* Diyagram bloğu: alt başlık + kutu içinde şema */}
              <div className="rounded-2xl border border-border/70 bg-card/40 shadow-sm ring-1 ring-foreground/[0.04] backdrop-blur-sm dark:bg-card/25">
                <div className="border-b border-border/60 px-5 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8">
                  <h3 className="text-center font-heading text-lg font-semibold tracking-tight text-foreground sm:text-left sm:text-xl">
                    {s.diagramHeadline}
                  </h3>
                  <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground sm:mx-0 sm:text-left sm:text-[0.9375rem]">
                    {s.diagramLead}
                  </p>
                </div>
                <div className="px-4 pb-6 pt-2 sm:px-6 sm:pb-8 sm:pt-4 md:px-8 md:pb-10">
                  <SystemEnergyHubDiagram nodes={s.nodes} hub={s.hub} />
                </div>
              </div>

              {/* Alt: iki bilgi kartı */}
              <div className="grid gap-5 sm:gap-6 lg:grid-cols-2 lg:items-stretch">
                <div className="relative flex min-h-[240px] flex-col overflow-hidden rounded-2xl border border-slate-700/40 shadow-lg ring-1 ring-white/5 lg:min-h-[280px]">
                  <div
                    className="arch-card-animated-bg-dark absolute inset-0"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-slate-950/55 to-transparent"
                    aria-hidden
                  />
                  <div className="relative z-10 flex h-full flex-col justify-center px-6 py-8 sm:px-8 sm:py-9">
                    <h3 className="font-heading text-base font-semibold text-sky-300 sm:text-lg">
                      {s.safeFlowTitle}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-100/93 sm:text-[0.9375rem]">
                      {s.safeFlowBody}
                    </p>
                  </div>
                </div>

                <div className="relative flex min-h-[240px] flex-col overflow-hidden rounded-2xl border border-white/20 shadow-lg ring-1 ring-white/10 lg:min-h-[280px]">
                  <div
                    className="arch-card-animated-bg-brand absolute inset-0"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-black/25"
                    aria-hidden
                  />
                  <div className="relative z-10 flex h-full flex-col justify-center px-6 py-8 sm:px-8 sm:py-9">
                    <h3 className="font-heading text-base font-semibold text-white sm:text-lg">
                      {s.integrationTitle}
                    </h3>
                    <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/95 sm:space-y-3.5 sm:text-[0.9375rem]">
                      {s.integrationParagraphs.map((para, index) => (
                        <p key={index}>{para}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </Container>
    </section>
  );
}
