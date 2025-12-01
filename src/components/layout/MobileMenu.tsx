'use client';

import Link from 'next/link';
import { useState } from 'react';
import { COURSE_LOCATIONS } from '@/data/courseNav';

type MenuView = 'main' | 'courses';

export default function MobileMenu({
  isNavOpen,
  onClose
}: {
  isNavOpen: boolean;
  onClose: () => void;
}) {
  const [view, setView] = useState<MenuView>('main');
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const formatLabel = (slug: string) =>
    slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  const allCourses = Object.keys(COURSE_LOCATIONS);

  const handleLinkClick = () => {
    onClose(); // ⭐ CLOSE THE MENU
  };

  return (
    <div
      className={`xl:hidden fixed inset-y-0 right-0 w-full sm:w-[28rem] bg-black/70 backdrop-blur-xl px-7 py-6 z-[999] transition-all duration-300 ${isNavOpen ? 'block' : 'hidden'
        }`}
    >
      {/* Scrollable container */}
      <div className="mt-20 h-[80vh] overflow-y-hidden pb-20 ">
        {/* MAIN MENU */}
        {view === 'main' && (
          <div className="space-y-3">
            <NavItem href="/" onClick={handleLinkClick}>
              Home
            </NavItem>

            <NavItem
              href="/placements/students-review"
              onClick={handleLinkClick}
            >
              Student Reviews
            </NavItem>

            <NavItem href="/blogs" onClick={handleLinkClick}>
              Blogs
            </NavItem>

            <NavItem href="/contact-us" onClick={handleLinkClick}>
              Contact Us
            </NavItem>

            {/* COURSES BUTTON */}
            <button
              className="w-full flex justify-between items-center text-white py-2 hover:text-red-600 hover:pl-2 transition-all"
              onClick={() => setView('courses')}
            >
              <span>Courses</span>
              <ArrowIcon />
            </button>
          </div>
        )}

        {/* COURSES LIST */}
        {view === 'courses' && (
          <div className="space-y-2">
            <BackButton onClick={() => setView('main')} />

            {allCourses.map((course) => {
              const isOpen = expandedCourse === course;

              return (
                <div key={course} className="border-b border-white/10 pb-1">
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/courses/${course}`}
                      onClick={handleLinkClick}
                      className="text-white py-2 hover:text-red-600 hover:pl-2 transition-all block"
                    >
                      {formatLabel(course)}
                    </Link>

                    <button
                      onClick={() =>
                        setExpandedCourse(isOpen ? null : course)
                      }
                      className="text-white ml-2"
                    >
                      <ArrowIcon rotate={isOpen} />
                    </button>
                  </div>

                  {isOpen && (
                    <div className="pl-4 mt-1 space-y-1">
                      {COURSE_LOCATIONS[course].map((location) => (
                        <Link
                          key={location}
                          href={`/courses/${course}/${location.toLowerCase()}`}
                          onClick={handleLinkClick}
                          className="text-white/80 hover:text-red-500 block py-1 text-sm transition-all"
                        >
                          {location}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* SUB COMPONENTS ------------------- */

function NavItem({
  href,
  children,
  onClick
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link href={href}>
      <div
        onClick={onClick}
        className="text-white py-2 hover:text-red-600 hover:pl-2 transition-all"
      >
        {children}
      </div>
    </Link>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center text-white py-2 space-x-2"
    >
      <BackArrowIcon />
      <span>Back</span>
    </button>
  );
}

function ArrowIcon({ rotate }: { rotate?: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      fill="currentColor"
      className={`transition-transform duration-300 ${rotate ? 'rotate-90' : ''
        }`}
      viewBox="0 0 24 24"
    >
      <path d="M13.2 16.5L14.3 17.5L19.5 12.5L14.3 7.5L13.2 8.5L17 12L13.2 16.5Z" />
      <path d="M5 11.25H19V12.75H5V11.25Z" />
    </svg>
  );
}

function BackArrowIcon() {
  return (
    <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9.66 8.53L8.6 7.47 4.47 11.59 5.53 12.65 9.66 8.53ZM4.49 12.67L8.62 16.55 9.64 15.45 5.51 11.58 4.49 12.67ZM5 12.87H15.37V11.37H5V12.87Z" />
    </svg>
  );
}
