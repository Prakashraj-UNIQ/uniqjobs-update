"use client";
import Link from "next/link";

type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-4">
      <ol className="flex flex-wrap gap-1 items-center">
        {items.map((c, i) => (
          <li key={i} className="flex items-center">
            {c.href ? (
              <Link href={c.href} className="hover:text-white underline-offset-2 hover:underline">
                {c.label}
              </Link>
            ) : (
              <span className="text-white">{c.label}</span>
            )}
            {i < items.length - 1 && <span className="mx-1 text-gray-600">›</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
