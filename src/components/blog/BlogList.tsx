"use client";
import { useState, useMemo, useEffect } from "react";
import BlogCard from "@/components/ui/cards/BlogCard";
import Breadcrumbs from "@/components/blog/Breadcrumbs";

interface BlogPost {
  slug: string;
  title: string;
  schedule_timer: string | Date;
  image: string;
}

export default function BlogList({ blogs, crumb }: { blogs: BlogPost[]; crumb: string }) {

  const [visibleCount, setVisibleCount] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 1s shimmer
    return () => clearTimeout(timer);
  }, []);

  const filteredBlogs = useMemo(() => {
    if (!searchTerm.trim()) return blogs;
    const lower = searchTerm.toLowerCase();
    return blogs.filter((b) => b.title.toLowerCase().includes(lower));
  }, [blogs, searchTerm]);

  const visibleBlogs = filteredBlogs.slice(0, visibleCount);

  return (
    <main className="col-span-11 bg-white px-4 xl:px-10 xl:px-25 overflow-y-auto pb-4">

      <div className="flex-col lg:flex-row lg:flex  justify-between items-center pb-2">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blogs", href: "/blogs" },
            { label: crumb || "Latest Blogs" },
          ]}
        />
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
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
            <article key={i}>
              <BlogCardShimmer />
            </article>
          ))
          : visibleBlogs.map((p) => (
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
        <div className="text-end">
          <button
            onClick={() => setVisibleCount((c) => c + 4)}
            className="border border-brandRed py-1 px-3  text-brandRed font-medium rounded transition my-10 cursor-pointer inline-flex items-center jusitfy-center gap-1"
          >
            Learn More
            <svg
              width={12}
              height={12}
              fill={'#D10000'}
              viewBox="0 0 511.881 511.881"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <g>
                  <g>
                    <path d="M248.36,263.428c4.16,4.16,10.88,4.16,15.04,0L508.733,18.095c4.053-4.267,3.947-10.987-0.213-15.04
            c-4.16-3.947-10.667-3.947-14.827,0l-237.76,237.76L18.173,3.054C13.907-1.106,7.187-0.999,3.027,3.268
            c-3.947,4.16-3.947,10.667,0,14.827L248.36,263.428z" />
                    <path d="M508.627,248.388c-4.267-4.053-10.773-4.053-14.933,0l-237.76,237.76l-237.76-237.76
            c-4.267-4.053-10.987-3.947-15.04,0.213c-3.947,4.16-3.947,10.667,0,14.827l245.333,245.333c4.16,4.16,10.88,4.16,15.04,0
            L508.84,263.428C512.893,259.161,512.787,252.441,508.627,248.388z" />
                  </g>
                </g>
              </g>
            </svg>
          </button>
        </div>
      )}
    </main>
  );
}

const BlogCardShimmer = () => {
  return (
    <div className="rounded overflow-hidden shadow-lg flex flex-col lg:flex-row bg-gray-100 animate-pulse">
      <div className="lg:w-1/3 bg-gray-300"></div>
      <div className="p-4 flex-1 space-y-4">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="flex gap-2 mt-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>

  );
};


