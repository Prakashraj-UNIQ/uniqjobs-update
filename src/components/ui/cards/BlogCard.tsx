import React from "react";
import TimeAgo from "../../common/TimeAgo";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
    title?: string;
    duration?: string | Date;
    img?: string;
    slug?: string;
}

const IMG_BASE = "https://uniqjobs.co.in/blog_images";

function BlogCard({ title, duration, img, slug }: BlogCardProps) {

    const src = img ? `${IMG_BASE}/${encodeURIComponent(img)}` : "";

    return (
        <div className="rounded overflow-hidden shadow-lg flex flex-col">
            <Link href={`/blog/${slug}`}>
                <div className="relative">
                    <Image
                        className="w-full object-cover"
                        height={70}
                        width={70}
                        src={src}
                        alt={title || "Blog image"}
                        unoptimized
                    />
                    <div className="transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-0" />
                </div>
                <div className="px-3 md:px-6 py-4 mb-auto">
                    <h3 className="font-medium truncate-2-lines min-h-[3.5rem] text-lg inline-block hover:text-brandRed hover:underline mb-2">
                        {title}
                    </h3>
                </div>
            </Link>

            <div className="px-3 md:px-6 py-2 flex flex-row items-center gap-3 bg-gray-100">
                <div>
                    <div className="w-14 h-14 bg-white border border-black rounded-full font-semibold text-lg flex items-center justify-center">
                        U
                    </div>
                </div>
                <div>
                    <p className="text-sm font-normal text-gray-700">
                        Published By{" "}
                        <span className="coreGradient-text font-semibold">
                            Uniq Official
                        </span>
                    </p>
                    <span className="text-sm font-regular text-gray-700 flex flex-row items-center">
                        <svg
                            height="13px"
                            width="13px"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 
                c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 
                c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"
                                fill="currentColor"
                            />
                        </svg>
                        <span className="ml-1">
                            <TimeAgo date={duration} />
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
