"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";


export type CourseBannerProps = {
    title?: string;
    subtitle?: string;
    bgImageUrl?: string;
    applyHref?: string;
    youtubeId?: string;
};

export default function CourseBanner({
    title,
    subtitle,
    bgImageUrl,
    applyHref,
    youtubeId,
}: CourseBannerProps) {
    const [open, setOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }
        if (open) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);


    useEffect(() => {
        if (!open || !modalRef.current) return;
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], iframe, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        first?.focus();
    }, [open]);

    return (
        <section id="hero" className="relative w-full overflow-hidden pt-10 md:pt-0">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                {bgImageUrl ? (
                    <Image
                        src={bgImageUrl}
                        alt={title || "Course banner"}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="h-full w-full bg-gradient-to-br from-indigo-700 via-purple-700 to-fuchsia-600" />
                )}
                {/* Soft overlay for readability */}
                <div className="absolute inset-0 bg-black/80" />
            </div>

            {/* Content */}
            <div className="mx-auto flex min-h-[58svh] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center text-white sm:px-6 lg:px-8">


                <h1 className="max-w-3xl text-balance text-3xl font-extrabold tracking-tight sm:text-5xl">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mt-4 max-w-2xl text-pretty text-base/7 text-white/90 sm:text-lg/8">
                        {subtitle}
                    </p>
                )}

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <Link
                        href={applyHref || "/contactus"}
                        className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-gray-900 shadow-lg shadow-black/20 transition-all hover:shadow-xl hover:shadow-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                        aria-label="Apply Now"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-5 w-5"
                        >
                            <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 15h-2v-2h2Zm0-4h-2V7h2Z" />
                        </svg>
                        Apply Now
                    </Link>

                    <button
                        onClick={() => setOpen(true)}
                        className="inline-flex items-center  pulse-wave justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur transition-all hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                        aria-haspopup="dialog"
                        aria-expanded={open}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-5 w-5"
                        >
                            <path d="M8 5v14l11-7Z" />
                        </svg>
                        Course Overview
                    </button>

                </div>

                {/* Micro trust row */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-white/80">
                    <div className="inline-flex items-center gap-1 rounded-full bg-black/20 px-3 py-1">
                        <Star /> <Star /> <Star /> <Star /> <StarHalf />
                        <span className="ml-1">4.8/5 · 3k+ learners</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-black/20 px-3 py-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Zm0 2.18 7 3.11v4.71c0 4.64-3.22 9.03-7 10.28-3.78-1.25-7-5.64-7-10.28V6.29l7-3.11Z" /></svg>
                        Placement support
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-black/20 px-3 py-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 7a5 5 0 1 1-5 5 5.006 5.006 0 0 1 5-5m0-5a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Z" /></svg>
                        Beginner friendly
                    </div>
                </div>
            </div>

            {/* Modal */}
            {open && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Course Overview Video"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={() => setOpen(false)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

                    {/* Dialog */}
                    <div
                        ref={modalRef}
                        className="relative z-10 w-full max-w-5xl overflow-hidden rounded-lg bg-black shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                        tabIndex={-1}
                    >
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                            aria-label="Close video"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M6.4 4.98 4.98 6.4 10.59 12l-5.6 5.6L6.4 19.02 12 13.41l5.6 5.6 1.42-1.42L13.41 12l5.6-5.6L17.6 4.98 12 10.59z" /></svg>
                        </button>

                        {/* 16:9 responsive frame */}
                        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                            <iframe
                                className="absolute left-0 top-0 h-full w-full"
                                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1`}
                                title="Course Overview"
                                allow="autoplay; encrypted-media; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

function Star() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4 text-yellow-300"
            aria-hidden
        >
            <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
    );
}

function StarHalf() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4 text-yellow-300"
            aria-hidden
        >
            <path d="M12 15.4V4l-2.81 6.63L2 11.24l5.46 4.73L5.82 21 12 17.27V15.4z" />
        </svg>
    );
}
