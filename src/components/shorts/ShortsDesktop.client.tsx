"use client";

import { useState } from "react";
import type { ShortItem } from "@/data/shortVideo";
import Image from "next/image";
import Button from "../common/Button";

function YouTubeEmbed({ id, title }: { id: string; title?: string }) {
    return (
        <iframe
            key={id}
            className="w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&rel=0&modestbranding=1`}
            title={title ?? "Selected Video"}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
        />
    );
}

function ShortCard({
    item,
    active,
    onSelect,
}: {
    item: ShortItem;
    active: boolean;
    onSelect: (id: string) => void;
}) {
    return (
        <button
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(item.id)}
            className="relative w-[250px] rounded-xl overflow-hidden border border-white/10 hover:scale-[1.02] transition focus:outline-none focus:ring-2 focus:ring-primary-800"
        >
            <div className="relative aspect-[9/16] w-full">
                <Image
                    src={item.thumb}
                    alt={item.title ?? item.name ?? "short | uniq jobs"}
                    fill
                    sizes="250px"
                    className="object-cover"
                />
            </div>
            <div className="hidden pointer-events-none absolute inset-x-0 bottom-0 p-3 text-white bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-sm font-semibold line-clamp-1">
                    {item.name || item.title || ""}
                </p>
                {item.role && (
                    <p className="text-xs opacity-80 line-clamp-1">{item.role}</p>
                )}
                {item.salary && (
                    <p className="text-xs opacity-80">{item.salary}</p>
                )}
            </div>
            {active && (
                <span className="absolute inset-0 ring-2 ring-primary-800 rounded-xl pointer-events-none" />
            )}
        </button>
    );
}

export default function ShortsDesktop({
    items,
    buttonAccess = true,
}: {
    items: ShortItem[];
    buttonAccess?: boolean;
}) {
    const [activeId, setActiveId] = useState(items[0]?.id);
    const active = items.find((x) => x.id === activeId) ?? items[0];

    return (
        <div className="relative mx-auto max-w-screen-2xl grid lg:grid-cols-8 gap-8 w-full px-6">
            
            <aside className="sticky top-10 self-start hidden lg:flex col-span-2 pb-20">
                <div className="h-[90vh] w-full rounded-2xl overflow-hidden glass-card border border-white/10">
                    <YouTubeEmbed id={active.id} title={active.title} />
                    <div className="p-4 text-sm text-white/80">
                        <div className="font-semibold">{active.name || active.title}</div>
                        {active.role && <div className="opacity-80">{active.role}</div>}
                    </div>
                </div>
            </aside>

            <div className="relative col-span-6">
                <div className="mx-auto max-w-[1200px] grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))] justify-items-center">
                    {items.map((it) => (
                        <ShortCard
                            key={it.id}
                            item={it}
                            active={activeId === it.id}
                            onSelect={setActiveId}
                        />
                    ))}

                    {buttonAccess && (
                        <div className="z-1 col-span-full py-10 flex justify-center">
                            <Button
                                href="/placements/students-review"
                            >
                                Explore More
                            </Button>
                        </div>
                    )}
                </div>

                <div className="pointer-events-none absolute bg-gradient-to-t from-black/80 to-transparent rounded-xl bottom-0 left-0 right-0 h-1/4" />
            </div>
        </div>
    );
}
