"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

export default function BlogAside({
  categories,
  tags,
  crumb
}: {
  categories: string[];
  tags: string[];
  crumb: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [activeTab, setActiveTab] = useState("categories");

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeCategory = searchParams.get("category");
  const activeTag = searchParams.get("tag");

  // Scroll Refs
  const catScrollRef = useRef<HTMLDivElement>(null);
  const tagScrollRef = useRef<HTMLDivElement>(null);

  // Scroll visibility states
  const [catCanScrollLeft, setCatCanScrollLeft] = useState(false);
  const [catCanScrollRight, setCatCanScrollRight] = useState(false);
  const [tagCanScrollLeft, setTagCanScrollLeft] = useState(false);
  const [tagCanScrollRight, setTagCanScrollRight] = useState(false);

  const updateScrollButtons = (ref: any, setLeft: any, setRight: any) => {
    if (!ref.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;

    setLeft(scrollLeft > 0);
    setRight(scrollLeft + clientWidth < scrollWidth);
  };

  useEffect(() => {
    const catRef = catScrollRef.current;
    const tagRef = tagScrollRef.current;

    const handleCatScroll = () =>
      updateScrollButtons(catScrollRef, setCatCanScrollLeft, setCatCanScrollRight);
    const handleTagScroll = () =>
      updateScrollButtons(tagScrollRef, setTagCanScrollLeft, setTagCanScrollRight);

    catRef?.addEventListener("scroll", handleCatScroll);
    tagRef?.addEventListener("scroll", handleTagScroll);

    handleCatScroll();
    handleTagScroll();

    return () => {
      catRef?.removeEventListener("scroll", handleCatScroll);
      tagRef?.removeEventListener("scroll", handleTagScroll);
    };
  }, []);

  const scrollLeft = (ref: any) => ref.current?.scrollBy({ left: -200, behavior: "smooth" });
  const scrollRight = (ref: any) => ref.current?.scrollBy({ left: 200, behavior: "smooth" });

  if (!mounted) return <div className="p-4 rounded-md">Loading...</div>;

  return (
    <div className="py-2 bg-white">
      <h1 className="text-xl font-medium py-2 underline">IT Blogs & Technology</h1>

      {/* Tabs */}
      <div className="flex gap-3 border-b border-gray-400">
        {["categories", "tags"].map((tab) => (
          <Link href={"/blogs"}>
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize transition cursor-pointer
              ${activeTab === tab
                  ? "text-brandRed border-b-4 border-brandRed"
                  : "text-gray-600 hover:text-black"
                }
            `}
            >
              {tab}
            </button>
          </Link>
        ))}
      </div>

      {/* Content */}
      <div>
        {/* Categories */}
        {activeTab === "categories" && (
          <div className="relative border-b border-gray-400 py-3">

            {catCanScrollLeft && (
              <button
                onClick={() => scrollLeft(catScrollRef)}
                className="absolute left-0 top-1/2 -translate-y-1/2 
                  bg-white shadow p-2 rounded-full z-10"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5l-7 7 7 7" />
                </svg>
              </button>
            )}

            {catCanScrollRight && (
              <button
                onClick={() => scrollRight(catScrollRef)}
                className="absolute right-0 top-1/2 -translate-y-1/2 
                  bg-white shadow p-2 rounded-full z-10"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            <div ref={catScrollRef} className="flex gap-3 overflow-x-auto no-scrollbar px-10">

              {/* LATEST BLOG — default active when no filter applied */}
              <Link href={`/blogs`}>
                <button
                  className={`border px-4 py-1 rounded transition cursor-pointer
                    ${!activeCategory
                      ? "border-brandRed text-brandRed font-medium"
                      : "border-gray-400 text-gray-400 hover:border-brandRed hover:text-brandRed"
                    }
                  `}
                >
                  Latest Blogs
                </button>
              </Link>

              {categories.map((category, i) => (
                <Link key={i} href={`/blogs/category/?category=${encodeURIComponent(category)}`}>
                  <button
                    className={`border px-4 py-1 rounded transition cursor-pointer
                      ${activeCategory === category
                        ? "border-brandRed text-brandRed font-medium"
                        : "border-gray-400 text-gray-400 hover:border-brandRed hover:text-brandRed "
                      }
                    `}
                  >
                    {category}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {activeTab === "tags" && (
          <div className="relative border-b border-gray-400 py-3">

            {tagCanScrollLeft && (
              <button
                onClick={() => scrollLeft(tagScrollRef)}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5l-7 7 7 7" />
                </svg>
              </button>
            )}

            {tagCanScrollRight && (
              <button
                onClick={() => scrollRight(tagScrollRef)}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            <div ref={tagScrollRef} className="flex gap-3 overflow-x-auto no-scrollbar px-10">
              <Link href={`/blogs`}>
                <button
                  className={`border px-4 py-1 rounded transition cursor-pointer
                    ${!activeTag
                      ? "border-brandRed text-brandRed font-medium"
                      : "border-gray-400 text-gray-400 hover:border-brandRed hover:text-brandRed"
                    }
                  `}
                >
                  Latest Blogs
                </button>
              </Link>

              {tags.map((tag, i) => (
                <Link key={i} href={`/blogs/tags/?tag=${encodeURIComponent(tag)}`}>
                  <button
                    className={`border px-4 py-1 rounded transition cursor-pointer
                      ${activeTag === tag
                        ? "border-brandRed text-brandRed font-medium"
                        : "border-gray-400 text-gray-400 hover:border-brandRed hover:text-brandRed"
                      }
                    `}
                  >
                    #{tag}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
