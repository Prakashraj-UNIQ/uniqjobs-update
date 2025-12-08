"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { COURSE_LOCATIONS, locSlug } from "@/data/courseNav";

const underlineTextClass =
  "relative inline-block leading-none after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100";

export default function Navbar() {
  const pathname = usePathname();
  const isCourses = pathname.startsWith("/courses");

  const [open, setOpen] = useState(false);
  const [activeCourseKey, setActiveCourseKey] = useState<string | null>(null);

  const menuRef = useRef<HTMLLIElement | null>(null);
  const [atTop, setAtTop] = useState(true);
  const [showNav, setShowNav] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const lastY = lastScrollYRef.current;

      if (currentY <= 0) {

        setAtTop(true);
        setShowNav(true);
        lastScrollYRef.current = 0;
        return;
      }

      setAtTop(false);

      if (Math.abs(currentY - lastY) < 5) {
        return;
      }

      if (currentY > lastY) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      lastScrollYRef.current = currentY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
    setActiveCourseKey(null);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setActiveCourseKey(null);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setActiveCourseKey(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const courseKeys = Object.keys(COURSE_LOCATIONS);

  return (
    <nav
      className={`
          hidden xl:flex px-24 justify-start items-center
          border-b border-gray-900 bg-[#0f0f0f] z-[50]
          transition-transform duration-300
          ${atTop
          ? "relative translate-y-0"
          : `fixed top-0 left-0 right-0 ${showNav ? "translate-y-0" : "-translate-y-full"
          }`
        }
        `}
    >
      <ul className="flex justify-center items-center gap-x-10 text-white/60 font-primary font-medium text-base py-2">
        <li>
          <Link
            href="/"
            className={`${underlineTextClass} ${pathname === "/" ? "after:scale-x-100 text-white font-semibold" : ""
              }`}
          >
            Home
          </Link>

        </li>

        <li className="relative z-50 py-2" ref={menuRef}>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="courses-mega"
            onClick={() => setOpen((v) => !v)}
            className={`flex items-center gap-2 leading-none ${isCourses ? "text-white font-semibold" : ""
              }`}
          >
            <span className={`${underlineTextClass} ${isCourses ? "after:scale-x-100" : ""}`}>
              Courses
            </span>
            <svg
              className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""
                }`}
              viewBox="0 0 24 24"
              fill="#9f9f9f"
            >
              <polygon points="5 8 12 16 19 8" />
            </svg>
          </button>

          {open && (
            <div
              id="courses-mega"
              className="absolute top-10 left-0 bg-[#0f0f0f]/95 text-white shadow-2xl border border-gray-800 backdrop-blur-md"
            >
              <div className="grid grid-cols-[360px_300px] gap-6 p-6">
                <div className="pr-2">
                  <ul className="space-y-2">
                    {courseKeys.map((key) => (
                      <li
                        key={key}
                        className="group flex items-center justify-between"
                        onMouseEnter={() => setActiveCourseKey(key)}
                        onFocus={() => setActiveCourseKey(key)}
                      >
                        <Link
                          href={`/courses/${key}`}
                          className={`${underlineTextClass} ${pathname.startsWith(`/courses/${key}`) ? "after:scale-x-100 text-primary-400" : ""
                            }`}
                        >
                          {key.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase())}
                        </Link>

                        <span className="text-gray-500 group-hover:text-primary-400">
                          ›
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 pt-3 border-t border-gray-800">
                    <Link
                      href="/courses"
                      className="text-sm underline hover:text-primary-400"
                    >
                      View all courses →
                    </Link>
                  </div>
                </div>

                <div className="border-l border-gray-800 pl-4 min-w-[260px]">
                  <p className="text-sm font-semibold text-white">
                    Available Locations
                  </p>
                  {activeCourseKey ? (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {COURSE_LOCATIONS[activeCourseKey].map((loc) => (
                        <Link
                          key={`${activeCourseKey}-${loc}`}
                          href={`/courses/${activeCourseKey}/${locSlug(loc)}`}
                          className="px-3 py-2 rounded hover:bg-gray-800 transition"
                        >
                          {loc}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-gray-500">
                      Hover a course to see locations
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </li>

        <li>
          <Link
            href="/placements/students-review"
            className={`${underlineTextClass} ${pathname === "/placements/students-review" ? "after:scale-x-100 text-white" : ""
              }`}
          >
            Students Review
          </Link>

        </li>
        <li>
          <Link
            href="/blogs"
            className={`${underlineTextClass} ${pathname.startsWith("/blogs") ? "after:scale-x-100 text-white" : ""
              }`}
          >
            Blogs
          </Link>

        </li>
        <li>
          <Link
            href="/contact-us"
            className={`${underlineTextClass} ${pathname === "/contact-us" ? "after:scale-x-100 text-white" : ""
              }`}
          >
            Contact Us
          </Link>

        </li>
      </ul>
    </nav>
  );
}
