"use client";

import { statsSection } from "@/lib/constants";

import { Container } from "../layout/container";
import { CountUp } from "../ui/count-up";

export function StatsSection() {
  return (
    <section
      id={statsSection.id}
      className="scroll-mt-24 border-t border-[#F0F0F0] bg-white py-14 sm:py-16"
      aria-label="Öne çıkan rakamlar"
    >
      <Container>
        <ul className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-10">
          {statsSection.stats.map((stat, index) => {
            const delay = index * 0.12;

            return (
              <li
                key={stat.key}
                className="flex flex-col items-center text-center"
              >
                <div className="flex items-start justify-center gap-0.5 text-primary">
                  {stat.format === "plus" ? (
                    <>
                      <span className="font-heading text-4xl font-bold tabular-nums tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-none">
                        <CountUp
                          end={stat.value}
                          delay={delay}
                          duration={1.9}
                        />
                      </span>
                      <span
                        className="mt-1 text-2xl font-bold leading-none sm:text-3xl"
                        aria-hidden
                      >
                        +
                      </span>
                    </>
                  ) : stat.format === "unit" ? (
                    <span className="flex items-baseline gap-1.5 font-heading font-bold tabular-nums tracking-tight">
                      <span className="text-4xl sm:text-5xl lg:text-[3.25rem] lg:leading-none">
                        <CountUp
                          end={stat.value}
                          delay={delay}
                          duration={1.9}
                        />
                      </span>
                      <span className="text-lg font-semibold uppercase tracking-wide sm:text-xl">
                        {stat.unit}
                      </span>
                    </span>
                  ) : (
                    <span className="font-heading text-4xl font-bold tabular-nums tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-none">
                      <CountUp
                        end={stat.value}
                        delay={delay}
                        duration={1.9}
                      />
                    </span>
                  )}
                </div>
                <p className="mt-4 max-w-[14rem] text-sm leading-snug text-[#757575] sm:text-base">
                  {stat.label}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
