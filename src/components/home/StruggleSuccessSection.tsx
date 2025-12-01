"use client";

import { useEffect, useState } from "react";

const CrossIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="#e11d48"
    xmlns="http://www.w3.org/2000/svg"
    className="mt-[2px]"
  >
    <path d="M6 6l12 12M18 6L6 18" stroke="#e11d48" strokeWidth="2" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="#16a34a"
    xmlns="http://www.w3.org/2000/svg"
    className="mt-[2px]"
  >
    <path d="M20 6L9 17l-5-5" stroke="#16a34a" strokeWidth="2" fill="none" />
  </svg>
);

export default function StruggleSuccessSection() {
  const struggles = [
    "I don’t know where to begin my IT journey",
    "Coding and technical concepts feel too hard",
    "I tried learning online but nothing stayed",
    "I don’t have confidence for interviews",
    "Career gap / Non-IT background worries me",
    "I feel I’m falling behind in the AI era",
    "I can’t build real projects confidently",
    "I want a job but don’t know the roadmap",
  ];

  const success = [
    "I have a clear learning roadmap",
    "Technical concepts finally make sense",
    "I can build real-world industry projects",
    "I’m confident in interviews & communication",
    "Gap / Non-IT background is no longer a barrier",
    "I’m learning future-ready AI & IT skills",
    "I’m getting better job calls & opportunities",
    "I feel confident, skilled & unstoppable",
  ];

  const [visibleIndex, setVisibleIndex] = useState<number>(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current <= struggles.length) {
        setVisibleIndex(current);
      } else {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [struggles.length]);

  return (
    <section className="bg-white py-10 sm:py-16 px-4">

      <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-snug tracking-tight">
        From{" "}
        <span className="text-red-600">Struggle</span> to{" "}
        <span className="underline decoration-red-600 underline-offset-4">
          Success
        </span>{" "}
        with UNIQ
      </h2>

      <p className="text-center text-gray-600 max-w-2xl mx-auto mt-4 text-sm md:text-base">
        We helph4you move from confusion to clarity with a clear roadmap,
        personal guidance, and powerful career support.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-7xl mx-auto">

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-8">
          <h3 className="flex items-center gap-2 text-2xl font-bold text-red-600 mb-6">
            Student Struggles
          </h3>

          <div className="space-y-4">
            {struggles.map((text, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 text-gray-700 text-sm md:text-base transition-all duration-500 ${index < visibleIndex ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"
                  }`}
              >
                <CrossIcon />
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-8">
          <h3 className="flex items-center gap-2 text-2xl font-bold text-green-600 mb-6">
            Success at UNIQ
          </h3>

          <div className="space-y-4">
            {success.map((text, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 text-gray-800 text-sm md:text-base transition-all duration-500 ${index < visibleIndex ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"
                  }`}
              >
                <CheckIcon />
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
