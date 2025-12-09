"use client";
import BlogAsideCard from "../ui/cards/BlogAsideCard";
import { useState } from "react";

type Post = {
    slug: string;
    title: string;
    coverImage?: string;
    publishedAt?: string;
    category?: string;
};

const RelatedPosts = ({
    posts,
    heading = "Related posts",
}: {
    posts: Post[];
    heading?: string;
}) => {

    const [viewedBlogs, setViewedBlogs] = useState<Post[]>([]);

    const handleClick = (post: Post) => {
        setViewedBlogs((prev) => {
            // avoid duplicate entries
            if (prev.find((item) => item.slug === post.slug)) return prev;
            return [...prev, post];
        });
    };

    return (
        <>
            <h2 className="text-2xl font-medium py-4 lg:pb-8 underline">
                {heading}
            </h2>

            {/* 👉 Right Side List */}
            <div className="grid lg:grid-cols-1 gap-6 lg:gap-4">
                {posts.map((p) => (
                    <article key={p.slug}>
                        <div onClick={() => handleClick(p)}>
                            <BlogAsideCard
                                title={p.title}
                                duration={p.publishedAt}
                                img={p.coverImage}
                                slug={p.slug}
                            />
                        </div>
                    </article>
                ))}
            </div>

            {/* 👉 Previously viewed blogs (Appended list) */}
            {viewedBlogs.length > 0 && (
                <>
                    <h3 className="text-xl font-semibold mt-6">Previously Viewed</h3>
                    <div className="grid lg:grid-cols-1 gap-4 mt-3">
                        {viewedBlogs.map((p) => (
                            <BlogAsideCard
                                key={p.slug}
                                title={p.title}
                                duration={p.publishedAt}
                                img={p.coverImage}
                                slug={p.slug}
                            />
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default RelatedPosts;
