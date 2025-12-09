'use client';

import React, { useState } from "react";

type Faq = { question: string; answer: string; };


export default function FaqSection({ faqs }: { faqs: Faq[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };


    return (
        <section
            id="faq"
            className="min-h-screen py-10 px-2 md:px-20 flex flex-col items-center"
        >
            <h2 className="text-3xl font-bold font-primary mb-6 text-center"> Frequently Asked Questions </h2>
            <div className="px-4 md:px-5 lg:px-16 xl:px-10 w-full">

                <div className="divide-y divide-gray-300">
                    {faqs.map((item, index) => (
                        <div key={index} className="py-4">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center py-2 text-left text font-semibold text-gray-800 hover:text-brandRed transition-colors"
                            >
                                <span className={`flex-1 ${openIndex === index ? "font-bold" : "font-normal"}`}>
                                    {item.question}
                                </span>
                                <span className="flex-shrink-0 ml-2 transition-transform duration-300 transform">
                                    {openIndex === index ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-brandRed"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <line x1="18" y1="12" x2="6" y2="12" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-gray-700"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <line x1="12" y1="6" x2="12" y2="18" />
                                            <line x1="6" y1="12" x2="18" y2="12" />
                                        </svg>
                                    )}
                                </span>
                            </button>

                            <div
                                className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === index ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="rounded bg-[#ffecec] p-4 text-gray-800 ">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

