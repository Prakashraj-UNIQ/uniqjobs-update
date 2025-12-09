import React from "react";
import TimeAgo from "../../common/TimeAgo";
import Link from "next/link";

interface BlogCardProps {
    title?: string;
    duration?: string | Date;
    img?: string;
    slug?: string;
}

const IMG_BASE = "https://uniqjobs.co.in/blog_images";

const BlogCard = ({ title, duration, img, slug }: BlogCardProps) => {
    const src = img ? `${IMG_BASE}/${encodeURIComponent(img)}` : null;

    return (
        <div className="flex flex-col md:flex-row rounded overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">

            {/* Left Side Image */}
            <Link href={`/blog/${slug}`} className="w-full md:w-2/5 h-35 md:h-auto">
                <div className="relative  flex-shrink-0">
                    {src ? (
                        <img
                            src={src}
                            alt={title || "Blog image"}
                            className="w-full h-full object-cover object-center"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
                            <span className="text-white font-bold text-lg text-center px-2">
                                No Image
                            </span>
                        </div>
                    )}
                </div>
            </Link>

            {/* Right Side Content */}
            <div className="p-2 flex flex-col justify-between w-full md:w-3/5">
              <Link href={`/blog/${slug}`}>
                <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 hover:text-brandRed hover:underline transition-colors">
                    {title || "Untitled Blog"}
                </h3>
              
              </Link>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-auto gap-3">
                    {/* Author & Time */}
                    <div className="flex items-center gap-2">
                        <div className=" w-8 h-8 bg-white border border-gray-300 rounded-full font-semibold text-sm flex items-center justify-center shadow-sm">
                            U
                        </div>
                        <div className="flex flex-col ">
                            <p className="text-xs text-gray-600">
                                Published By{" "}
                                <span className="coreGradient-text font-semibold">Uniq Official</span>
                            </p>
                            <p className="text-xs text-gray-500 flex items-center">
                                <svg
                                    height="10px"
                                    width="10px"
                                    viewBox="0 0 512 512"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-1"
                                >
                                    <path
                                        d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 
                      c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 
                      c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <TimeAgo date={duration} />
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BlogCard;
