"use client";

import React, { useEffect, useRef } from "react";

export type ModulePoint = { text: string };
export type Module = { id: string; title: string; subtitle?: string; points: ModulePoint[] };

type CSSVars = React.CSSProperties & {
    '--stack-top'?: string;
    '--stack-unit'?: string;
};

export default function SyllabusSection({ MODULES }: { MODULES: Module[] }) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const cards = Array.from(
            containerRef.current.querySelectorAll<HTMLElement>('[data-module-inner]')
        );
        const points = Array.from(
            containerRef.current.querySelectorAll<HTMLElement>('[data-point]')
        );

        const cardObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('is-visible');
                });
            },
            { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.2 }
        );

        const pointObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('point-visible');
                });
            },
            { root: null, rootMargin: '0px 0px -15% 0px', threshold: 0.05 }
        );

        cards.forEach((el) => cardObserver.observe(el));
        points.forEach((el) => pointObserver.observe(el));

        return () => {
            cardObserver.disconnect();
            pointObserver.disconnect();
        };
    }, []);

    const stackVars: CSSVars = {
        '--stack-top': '0px',
        '--stack-unit': '1.25rem',
    };

    return (
        <section className="relative w-full bg-black text-white">
            <div className="mx-auto grid grid-cols-1 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-25">

                <div className="lg:sticky lg:top-24 self-start">
                    <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">What You’ll Learn</h2>
                    <p className="mt-4 max-w-xl text-base/7 text-white/80">
                        Explore the <span className="font-semibold text-red-400">100-days roadmap</span> that turns you into a
                        Full Stack Developer. Master the foundations first, then move into backend, APIs, frontend frameworks,
                        databases, and deployment.
                    </p>
                </div>

                <div className="relative">

                    <div ref={containerRef} style={stackVars}>
                        <ol className="relative space-y-6 pt-2 pb-40">

                            <span
                                aria-hidden
                                className="pointer-events-none absolute left-3 top-0 h-[95%] w-px bg-gradient-to-b from-red-500/70 via-red-500/30 to-transparent z-46"
                            />

                            {MODULES.map((m: Module, idx: number) => (
                                <li key={m.id} className="relative">

                                    <span className="absolute -left-[2px] top-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-[11px] font-bold shadow ring-2 ring-black/30 z-48">
                                        {m.id}
                                    </span>

                                    <div
                                        data-module-card
                                        style={{
                                            zIndex: 50 - idx,
                                            top: `calc(var(--stack-top) + ${((idx) * (idx + 1)) / 2} * var(--stack-unit))`,
                                        } as React.CSSProperties}
                                        className="sticky"

                                    >
                                        <div
                                            data-module-inner
                                            className="translate-y-6 opacity-0 will-change-transform transition-all duration-700 rounded-2xl border border-gray-500/20 bg-white/5 p-5 shadow-[0_6px_24px_rgba(0,0,0,0.35)] backdrop-blur hover:border-gray-500/40">
                                            <div className="mb-2 flex items-center justify-between">
                                                <h3 className="text-lg font-semibold text-white">
                                                    {m.title} <span className="text-white/60">· {m.subtitle}</span>
                                                </h3>
                                                <span className="text-[11px] text-white/60">{m.points.length} topics</span>
                                            </div>

                                            <ul className="mt-2 space-y-2">
                                                {m.points.map((p, pidx: number) => (
                                                    <li
                                                        key={pidx}
                                                        data-point
                                                        style={{ transitionDelay: `${Math.min(pidx * 90, 600)}ms` }}
                                                        className="flex translate-y-2 items-start gap-2 opacity-0 transition-all duration-500"
                                                    >
                                                        <Check className="mt-[2px] h-4 w-4 flex-none text-red-400" />
                                                        <span className="text-sm text-white/90">{p.text}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
            <style jsx global>{`
        .is-visible { opacity: 1 !important; transform: translate3d(0,0,0) !important; }
        .point-visible { opacity: 1 !important; transform: translateY(0) !important; }
      `}</style>
        </section>
    );
}

function Check({ className = "" }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden
        >
            <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
        </svg>
    );
}
