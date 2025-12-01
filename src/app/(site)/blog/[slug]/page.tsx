import TimeAgo from "@/components/common/TimeAgo";
import { getBlog } from "@/data/blog";
import Script from "next/script";
import Image from "next/image";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import { listBlogs } from "@/data/blog";
import RelatatedPosts from "@/components/blog/RelatatedPosts";
import Link from "next/link";

interface BlogSection {
    heading: string;
    paragraph: string;
}

interface BlogContent {
    title: string;
    description: string;
    sections: BlogSection[];
}

interface BlogTableData {
    columns: string[];
    rows: string[][];
}

interface Blog {
    id: number;
    category: string;
    tags: string[];
    slug: string;
    title: string;
    description: string;
    content: BlogContent[];
    table_data: BlogTableData;
    image: string;
    schedule_timer: string | Date;
}
const IMG_BASE = "https://uniqjobs.co.in/blog_images";
export const revalidate = 300;
const MAX_DESCRIPTION_LENGTH = 160;

export async function generateMetadata({ params }: { params: { slug: string } }) {

    const { slug } = await params;
    const blog = await getBlog(slug || "");
    const blogDetails: Blog = blog.data;
    const originalDescription = blogDetails.description || "";
    const src = blogDetails.image ? `${IMG_BASE}/${encodeURIComponent(blogDetails.image)}` : "";
    const description =
        originalDescription.length > MAX_DESCRIPTION_LENGTH
            ? originalDescription.slice(0, MAX_DESCRIPTION_LENGTH).trimEnd() + "..."
            : originalDescription;
    const title = blogDetails.title;
    const url = `https://www.uniqjobs.co.in/blog/${slug}`;
    const image = src;

    return {
        title,
        description,
        keywords: blogDetails.tags?.join(", "),
        alternates: { canonical: url },
        openGraph: { title, description, url, type: "article", images: [{ url: image }] },
        twitter: { card: "summary_large_image", title, description, images: [image] },
    };
}



export default async function BlogDetailsGrid({ params }: { params: { slug?: string } }) {

    const { slug } = await params;
    const blog = await getBlog(slug || "");
    const blogDetails: Blog = blog.data;
    if (!blogDetails) {
        return <div className="py-6">Blog not found.</div>;
    }
    const src = blogDetails.image ? `${IMG_BASE}/${encodeURIComponent(blogDetails.image)}` : "";


    const category = blogDetails.category;
    const tags = blogDetails.tags ?? [];
    const currentSlug = blogDetails.slug;

    const tagResults = await Promise.all(
        tags.map((tag: string) => listBlogs(1, 10, `&tag=${encodeURIComponent(tag)}`))
    );
    const categoryResult = await listBlogs(1, 10, `&category=${encodeURIComponent(category)}`);

    const fromTags = tagResults.flatMap((res) => res?.data ?? res?.posts ?? []);

    const fromCategory = categoryResult?.data ?? categoryResult?.posts ?? [];

    const allCandidates = [...fromTags, ...fromCategory];

    const map = new Map<string, Partial<Blog>>();

    for (const item of allCandidates) {
        if (!item?.slug) continue;
        if (item.slug === currentSlug) continue;

      
        if (!map.has(item.slug)) {
            map.set(item.slug, item as Partial<Blog>);
        }
    }
    const uniqueCandidates: Partial<Blog>[] = Array.from(map.values());

    const relatedSorted = uniqueCandidates
    const relatedClean = relatedSorted
        .filter((p) => p.slug && p.title) 
        .slice(0, 6)                      
        .map((p) => ({
            slug: p.slug as string,
            title: p.title as string,
            coverImage: p.image ?? p.image,
            publishedAt: p.schedule_timer instanceof Date ? p.schedule_timer.toISOString() : (p.schedule_timer as string | undefined),
            category: p.category,
        }));
 
    const relatedPosts = relatedSorted.slice(0, 6);

    return (

        <>
            <Script id="ld-post" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": blogDetails.title,
                    "image": blogDetails.image ? [blogDetails.image] : undefined,
                    "author": { "@type": "Person", "name": "Muhammad Hussain" },
                    "publisher": { "@type": "Organization", "name": "UniqJobs" },
                    "datePublished": blogDetails.schedule_timer,
                    "dateModified": blogDetails.schedule_timer ?? blogDetails.schedule_timer,
                    "articleSection": blogDetails.category,
                    "keywords": blogDetails.tags?.join(", "),
                    "mainEntityOfPage": `https://wwww.uniqjobs.co.in/blog/${blogDetails.slug}`,
                    "description": blogDetails.description,
                    "url": `https://www.uniqjobs.co.in/blog/${blogDetails.slug}`
                })}
            </Script>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-10 gap-10">
                {/* Main Content */}
                <div className="col-span-7 px-2 sm:pl-5 sm:pl-15 lg:pl-25 mt-20 sm:mt-0 lg:pr-15 bg-white pb-10">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Blogs", href: "/blogs" },
                            { label: blogDetails.title },
                        ]}
                    />


                    {/* Header Section */}
                    <div className="flex justify-between items-center">
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
                                <TimeAgo date={blogDetails.schedule_timer} />
                            </span>
                        </span>
                    </div>

                    {/* blogDetails Title */}
                    <div className="pb-4">
                        <h1 className="text-3xl text-gray-800">{blogDetails.title}</h1>
                    </div>

                    {/* blogDetails Image */}
                    <div className="rounded overflow-hidden  flex flex-col">
                        <div className="relative">
                            <Image
                                className="w-full"
                                src={src}
                                width={100}
                                height={100}
                                alt={blogDetails.title}
                                unoptimized
                            />
                            <div className="transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-0" />
                        </div>

                        {/* blogDetails Content */}
                        <div className="px-2  py-4 flex flex-col gap-3">
                            <p className="text-gray-600">{blogDetails.description}</p>

                            {blogDetails.content?.map((content, index) => (
                                <div key={index}>
                                    <h2 className="text-2xl font-medium pb-4">{content.title}</h2>
                                    <p className="text-gray-600 pb-4">{content.description}</p>

                                    {content.sections.map((section, secIndex) => (
                                        <div key={secIndex} className="pb-4">
                                            <h3 className="text-xl font-bold text-primary-800">
                                                {secIndex + 1}. {section.heading}
                                            </h3>
                                            <p className="text-gray-600">{section.paragraph}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}

                            {/* Table Section */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full table-auto border border-gray-300 rounded-lg">
                                    <thead>
                                        <tr className="bg-gray-100 text-gray-700">
                                            {blogDetails.table_data?.columns.map((heading, index) => (
                                                <th key={index} className="text-center p-3">
                                                    {heading}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {blogDetails.table_data?.rows.map((row, rowIndex) => (
                                            <tr
                                                key={rowIndex}
                                                className="border-t hover:bg-gray-50 transition"
                                            >
                                                {row.map((item, colIndex) => (
                                                    <td
                                                        className="p-3 font-medium text-center"
                                                        key={colIndex}
                                                    >
                                                        {colIndex === row.length - 1 ? (
                                                            <a
                                                                href={item}
                                                                className="text-blue-400 underline cursor-pointer"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                Click Here
                                                            </a>
                                                        ) : (
                                                            item
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <h2 className="text-2xl font-medium py-4 lg:pb-0 underline">
                                Tags In
                            </h2>
                            <ul className=" flex flex-wrap gap-y-2 text-gray-600 border-b border-gray-400 pb-4">
                                {tags.map((tag, ind) => (
                                    <li
                                        key={ind}
                                        className="text-base cursor-pointer text-sm text-brandRed px-3 py-1 border border-brandOrange rounded mr-2 mb-2 hover:bg-brandRed hover:text-white transition duration-300 ease-in-out"
                                    >
                                        <Link href={`/blogs/tags/?tag=${encodeURIComponent(tag)}`}>#{tag}</Link>

                                    </li>
                                ))}
                            </ul>
                            {relatedPosts.length > 0 && (
                                <RelatatedPosts posts={relatedClean} heading={`More in ${blogDetails.category}`} />
                            )}
                        </div>
                    </div>

                </div>

                {/* Sidebar */}
                <div className="hidden inner-shadow lg:block col-span-3 p-4 bg-[#f2f2f2]">

                </div>
            </div>

            <Script id="ld-breadcrumbs" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.uniqjobs.co.in/" },
                        { "@type": "ListItem", "position": 2, "name": "Blogs", "item": "https://www.uniqjobs.co.in/blogs" },
                        { "@type": "ListItem", "position": 3, "name": blogDetails.title, "item": `https://www.uniqjobs.co.in/blog/${blogDetails.slug}` },
                    ],
                })}
            </Script>
        </>
    );
};
