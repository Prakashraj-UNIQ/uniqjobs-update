"use client";
import { useState } from "react";
import type { ShortItem } from "@/data/shortVideo";
import Image from "next/image";
import Button from "../common/Button";


function MobileCard({ item, playingId, onPlay }: { item: ShortItem; playingId?: string | null; onPlay: (id: string) => void }) {
    const isPlaying = playingId === item.id;
    return (
        <button
            type="button"
            onClick={() => onPlay(item.id)}
            aria-label={`Play ${item.title ?? item.name ?? "short | uniq jobs"}`}
            className="relative w-full sm:w-[280px] md:w-[280px] aspect-[9/16] rounded-xl overflow-hidden bg-black border border-white/10 shadow-md focus:outline-none focus:ring-2 focus:ring-primary-800"
        >
            {isPlaying ? (
                <iframe
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&mute=1&rel=0&controls=1&modestbranding=1`}
                    title={item.title ?? item.name ?? "short | uniq jobs"}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            ) : (
                <>
                    <Image src={item.thumb} alt={item.title ?? item.name ?? "short | uniq jobs"} fill className="object-cover" sizes="180px" />
                    <div className="absolute inset-0 bg-black/15 flex items-center justify-center">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/95">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                        </span>
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 p-2 text-white bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-xs font-semibold line-clamp-1">{item.name || item.title || ""}</p>
                    </div>
                </>
            )}
        </button>
    );
}


export default function ShortsMobile({ items, buttonAccess = true }: { items: ShortItem[]; buttonAccess?: boolean }) {
    const [playingId, setPlayingId] = useState<string | null>(null);

    return (
        <div className="relative px-3">
        
            <div className="mx-auto max-w-[1100px] grid sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
                {items.map((it) => (
                    <MobileCard key={it.id} item={it} playingId={playingId} onPlay={setPlayingId} />
                ))}

                {buttonAccess && (
                    <div className="col-span-full py-6 flex justify-center">
                        <Button
                        href="/placements/students-review">
                            Explore More
                        </Button>
                    </div>
                )}
            </div>


            <div className="pointer-events-none absolute -z-10 bg-gradient-to-t from-black/80 to-transparent rounded-xl bottom-0 left-0 right-0 h-1/4" />
        </div>
    );
}