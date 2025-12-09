"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../common/Button";

interface Card {
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  img: string;
}

const cards: Card[] = [
  {
    title: "Offline Placement",
    subtitle: "Classroom Training",
    description:
      "Get hands-on training with expert instructors in a classroom setting. Designed for freshers who thrive in a traditional learning environment with real-time guidance.",
    points: [
      "Attend in-person classes with expert trainers",
      "Work on real-time projects and assignments",
      "Receive continuous mentorship and performance reviews",
      "Get placement support through mock interviews and job drives",
    ],
    img: "offlinePlacement.png",
  },
  {
    title: "Direct Placement",
    subtitle: "Placement Training",
    description:
      "Already skilled? Skip training and get evaluated now for direct job placement. We thoroughly assess your capabilities and connect you with top hiring companies.",
    points: [
      "Submit your resume and skill portfolio",
      "Appear for an assessment and personal evaluation",
      "Get shortlisted by hiring partners",
      "Attend direct interviews — no training required",
    ],
    img: "directPlacement.png",
  },
];

interface CheckProps {
  className?: string;
}

function Check({ className }: CheckProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
    </svg>
  );
}

const AutoAnimatedCards: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsDesktop(window.matchMedia("(min-width: 1280px)").matches);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop || isHovered) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isDesktop, isHovered]);

  return (
    <>
      <div className="hidden xl:block text-white pt-12 text-center bg-black">
        <h2 className="px-2 text-3xl sm:text-4xl lg:text-5xl font-black font-primary text-center leading-snug tracking-tight">
          Our{" "}
          <span className="bg-gradient-to-r from-[#ba181b] to-red-800 text-transparent bg-clip-text">
            Training &
          </span>{" "}
          &nbsp;
          <span className="underline decoration-[#641220] underline-offset-4">
            Placement
          </span>{" "}
          Approach
        </h2>
      </div>

      <div className="hidden xl:flex justify-center items-center py-12 gap-x-6 px-2 sm:px-20 bg-black">
        {cards.map((card, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={i}
              onMouseEnter={() => {
                setIsHovered(true);
                setActiveIndex(i);
              }}
              onMouseLeave={() => setIsHovered(false)}
              className={`
    group rounded-2xl border border-gray-500/20 bg-[#101010]
    shadow-[0_6px_24px_rgba(0,0,0,0.35)] backdrop-blur
    hover:border-gray-500/40 relative flex justify-between
    transition-all duration-300 ease-out h-[370px] xl:h-[350px]
    p-10 overflow-hidden
    ${isActive ? "flex-[5]" : "flex-[1]"}
  `}
              style={{ minWidth: "280px", maxWidth: "1200px" }}
            >
              <div className="flex-grow">
                <h3
                  className={`
    text-3xl font-bold font-primary mb-2 text-white
    transform transition-all duration-300
    ${isActive ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}
  `}
                >
                  {card.title}
                </h3>

                <p
                  className={`
    xl:max-w-xl text-white/90 text-base
    transform transition-all duration-300 delay-75 mb-4 
    ${isActive ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}
  `}
                >
                  {card.description}
                </p>

                <div
                  className={`
    flex flex-col gap-y-1 mb-6 text-white/90 text-base
    transform transition-all duration-300 delay-100
    ${isActive ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}
  `}
                >
                  {card.points.map((point, idx) => (
                    <div key={idx} className="flex items-center">
                      <Check className="mt-1 h-4 w-4 flex-none text-red-400" />
                      <p className="pl-2">{point}</p>
                    </div>
                  ))}
                </div>
                <div
                  className={`transition-all duration-500 w-full flex justify-start ${isActive ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <Button variants="outline">Apply Now</Button>
                </div>
              </div>

              <div
                className={`transition-all duration-700 sm:absolute top-50 xl:top-1/2 -translate-y-1/2 right-10 w-64 h-64 ${isActive ? "opacity-100" : "opacity-0"
                  }`}
              >
                <Image
                  src={`/images/${card.img}`}
                  alt={card.title}
                  width={250}
                  height={250}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="xl:hidden bg-black px-4 py-10 space-y-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-500/20 bg-[#101010] shadow-[0_6px_24px_rgba(0,0,0,0.35)] p-6 flex flex-col"
          >
            <div className="relative w-full h-48 mb-4">
              <Image
                src={`/images/${card.img}`}
                alt={card.title}
                fill
                className="object-contain"
              />
            </div>

            <h3 className="text-2xl font-bold font-primary mb-2 text-white">
              {card.title}
            </h3>
            <p className="text-sm text-white/80 mb-3">{card.description}</p>

            <div className="flex flex-col gap-y-1 text-sm text-white/85 mb-4">
              {card.points.map((point, idx) => (
                <div key={idx} className="flex items-start">
                  <Check className="mt-1 h-4 w-4 flex-none text-red-400" />
                  <p className="pl-2">{point}</p>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-2">
              <span className="inline-flex px-5 py-2 font-semibold cursor-pointer rounded-full bg-white text-black">
                <Link href="contact-us">Apply now</Link>
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AutoAnimatedCards;
