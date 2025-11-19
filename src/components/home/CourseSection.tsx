"use client";

import { useState } from "react";
import CourseCard from "../ui/cards/CourseCard";
import cardDetails from "@/content/courses/index.json";
import Link from "next/link";

type Tab = "popular" | "trending" | "new";

const CourseSection = () => {
    const [activeTab, setActiveTab] = useState<Tab>("popular");

    const filteredCourses = cardDetails.courses.filter((course) => {
        if (activeTab === "popular") return course.category === "popular";
        if (activeTab === "trending") return course.category === "trending";
        if (activeTab === "new") return course.category === "new";
        return true;
    });

    return (
        <div id="hero" className="bg-[#f2f2f2] py-10 px-2 sm:px-10 lg:px-20">
            <h2 className="px-4 text-black text-3xl lg:text-5xl text-center fold-primary font-black pb-10">
                What You’ll <span>Learn with Us?</span>
            </h2>

            {/* Tabs */}
            <div className="flex justify-start items-center mb-6 border-b border-gray-300">
                <div className="flex space-x-10">
                    {(["popular", "trending", "new"] as Tab[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 text-lg text-black transition-all ${activeTab === tab
                                    ? "border-b-4 border-red-600 font-medium text-brandRed"
                                    : "border-b-4 border-transparent  hover:text-brandRed"
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {filteredCourses.map((course) => (
                    <CourseCard
                        key={course.slug}
                        cta={course.cta}
                        courseTitle={course.title}
                        courseSalary={course.avgSalary}
                        courseDescription={course.description}
                        icon={course.icon}
                    />
                ))}
            </div>

            {/* View All Right End */}
            <div className="flex justify-end mt-6 items-center space-x-2">
                <Link href="/courses">
                    <span className="text-red-600 text-lg font-semibold hover:underline cursor-pointer flex items-center">
                        View All
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default CourseSection;
