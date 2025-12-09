// components/blog/Breadcrumbs.tsx
"use client";
import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-400  py-4">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {item.href ? (
              <Link href={item.href} className="hover:text-primary-500">
                {item.label}
              </Link>
            ) : (
              <span className="text-black">{item.label}</span>
            )}
            {i < items.length - 1 && <span className="text-gray-600">›</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
