"use client";
import { useState, useMemo } from "react";
import BlogCard from "@/components/ui/cards/BlogCard";
import Breadcrumbs from "@/components/blog/Breadcrumbs";

interface BlogPost {
  slug: string;
  title: string;
  schedule_timer: string | Date;
  image: string;
}

export default function BlogList({ blogs, crumb }: { blogs: BlogPost[]; crumb: string }) {

  const [visibleCount, setVisibleCount] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = useMemo(() => {
    if (!searchTerm.trim()) return blogs;
    const lower = searchTerm.toLowerCase();
    return blogs.filter((b) => b.title.toLowerCase().includes(lower));
  }, [blogs, searchTerm]);

  const visibleBlogs = filteredBlogs.slice(0, visibleCount);

  return (
    <main className="col-span-10 bg-white px-4 xl:px-10 xl:pl-25 overflow-y-auto">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blogs" },
          { label: crumb || "Latest Blogs" },
        ]}
      />

      <div className="flex-col lg:flex-row lg:flex  justify-between items-center pb-4">
        <h1 className="text-2xl font-medium pb-2 lg:pb-0 underline">
          IT Blogs & Technology
        </h1>


        <div className="relative w-full max-w-xs">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-1.5 pr-10 pl-3 w-full border border-gray-400 text-gray-600 rounded focus:outline-none"
            placeholder="Search for blog"
          />
          <svg
            className="h-5 w-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_15_152)">
              <rect width="24" height="24" fill="white" />
              <circle
                cx="10.5"
                cy="10.5"
                r="6.5"
                stroke="#000000"
                strokeLinejoin="round"
              />
              <path
                d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z"
                fill="#000000"
              />
            </g>
            <defs>
              <clipPath id="clip0_15_152">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-15">
        {visibleBlogs.map((p) => (
          <article key={p.slug}>
            <BlogCard
              title={p.title}
              duration={p.schedule_timer}
              img={p.image}
              slug={p.slug}
            />
          </article>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <p className="text-gray-600 italic mt-6 text-center">
          No blogs found matching your search.
        </p>
      )}

      {visibleCount < filteredBlogs.length && (
        <button
          onClick={() => setVisibleCount((c) => c + 4)}
          className="py-2 bg-gray-200 italic text-gray-600 font-medium rounded transition w-full my-10 cursor-pointer"
        >
          Load More...
        </button>
      )}
    </main>
  );
}
