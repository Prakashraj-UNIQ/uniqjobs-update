import React from 'react';
import ShortsMobile from "./ShortsMobile.client";
import { getPlacedCandidates } from "@/data/shortVideo";
import ShortsDesktop from './ShortsDesktop.client'


const ShortsDesktopComponent = ShortsDesktop as unknown as React.ComponentType<{ items: Record<string, unknown>[]; buttonAccess?: boolean }>;

type ShortsSectionProps = {
  variant?: "home" | "full";
};

export default async function ShortsSection({
  variant = "home",
}: ShortsSectionProps) {
  const allItems = await getPlacedCandidates();
  if (!allItems?.length) return null;

  const LIMIT = 8;
  const items =
    variant === "home" ? allItems.slice(0, LIMIT) : allItems;

  const buttonAccess = variant === "home" && allItems.length > LIMIT;

  return (
    <section className="bg-black">
      <div className="text-white py-8 text-center bg-black">
        {variant === "home" &&
          <h2 className="py-8 text-3xl lg:text-5xl font-black font-primary text-center text-white leading-snug tracking-tight">
            Our{" "}
            <span className="bg-gradient-to-r from-[#ba181b] to-red-800 text-transparent bg-clip-text">
              Student&apos;s
            </span>{" "}
            &nbsp;
            <span className="underline decoration-brandRed underline-offset-4">
              Success
            </span>{" "}
            Stories
          </h2>
        }
      </div>
      <div className="hidden lg:block">
        <ShortsDesktopComponent items={items} buttonAccess={buttonAccess} />
      </div>
      <div className="lg:hidden">
        <ShortsMobile items={items} buttonAccess={buttonAccess} />
      </div>
    </section>
  );
}
