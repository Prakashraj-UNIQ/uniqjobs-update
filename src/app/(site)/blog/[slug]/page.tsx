import TimeAgo from "@/components/common/TimeAgo";
import { getBlog } from "@/data/blog";
import Script from "next/script";
import Image from "next/image";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import { listBlogs } from "@/data/blog";
import RelatatedPosts from "@/components/blog/RelatatedPosts";
import YoutubeMiniFrame from "@/components/blog/YoutubeMiniFrame";

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
const getLinkType = (url: string) => {
    if (!url) return "other";

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
        return "youtube";
    }
    if (url.includes("wa.me") || url.includes("whatsapp.com")) {
        return "whatsapp";
    }
    if (url.includes("github.be") || url.includes("github.com")) {
        return "github";
    }
    if (url.startsWith("http")) {
        return "website";
    }
    return "other";
};



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

    interface TableRow {
        title: string;
        link: string;
        [key: string]: any; // optional for other columns
    }

    // Map the 2D string array into TableRow objects
    const allRows: TableRow[] = (blogDetails.table_data?.rows || []).map(
        (row: string[]) => ({
            title: row[0],           // first column = title
            description: row[1],     // optional, second column
            link: row[row.length - 1] // last column = link
        })
    );
    const nonYouTubeRows: TableRow[] = allRows.filter(
        (row: TableRow) =>
            !row.link.includes("youtube.com") && !row.link.includes("youtu.be")
    );


    const youtubeRows: TableRow[] = allRows.filter(
        (row: TableRow) =>
            row.link.includes("youtube.com") || row.link.includes("youtu.be")
    );
    const LinkIcon = () => (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 13a5 5 0 007.54.54l1.42-1.42a5 5 0 00-7.07-7.07l-1.42 1.42M14 11a5 5 0 00-7.54-.54l-1.42 1.42a5 5 0 007.07 7.07l1.42-1.42" />
        </svg>
    );

    const WhatsAppIcon = () => (
        <svg
            width={32}
            height={32}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31ZM16 28.8462C22.5425 28.8462 27.8462 23.5425 27.8462 17C27.8462 10.4576 22.5425 5.15385 16 5.15385C9.45755 5.15385 4.15385 10.4576 4.15385 17C4.15385 19.5261 4.9445 21.8675 6.29184 23.7902L5.23077 27.7692L9.27993 26.7569C11.1894 28.0746 13.5046 28.8462 16 28.8462Z"
                fill="#BFC8D0"
            />
            <path
                d="M28 16C28 22.6274 22.6274 28 16 28C13.4722 28 11.1269 27.2184 9.19266 25.8837L5.09091 26.9091L6.16576 22.8784C4.80092 20.9307 4.23125 18.5589 4.23125 16C4.23125 9.37258 9.60383 4 16.2312 4C22.8587 4 28.2313 9.37258 28.2313 16H28Z"
                fill="url(#paint0_linear)"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 18.5109 2.661 20.8674 3.81847 22.905L2 30L9.31486 28.3038C11.3014 29.3854 13.5789 30 16 30ZM16 27.8462C22.5425 27.8462 27.8462 22.5425 27.8462 16C27.8462 9.45755 22.5425 4.15385 16 4.15385C9.45755 4.15385 4.15385 9.45755 4.15385 16C4.15385 18.5261 4.9445 20.8675 6.29184 22.7902L5.23077 26.7692L9.27993 25.7569C11.1894 27.0746 13.5046 27.8462 16 27.8462Z"
                fill="white"
            />
            <path
                d="M12.5 9.49989C12.1672 8.83131 11.6565 8.8905 11.1407 8.8905C10.2188 8.8905 8.78125 9.99478 8.78125 12.05C8.78125 13.7343 9.52345 15.578 12.0244 18.3361C14.438 20.9979 17.6094 22.3748 20.2422 22.3279C22.875 22.2811 23.4167 20.0154 23.4167 19.2503C23.4167 18.9112 23.2062 18.742 23.0613 18.696C22.1641 18.2654 20.5093 17.4631 20.1328 17.3124C19.7563 17.1617 19.5597 17.3656 19.4375 17.4765C19.0961 17.8018 18.4193 18.7608 18.1875 18.9765C17.9558 19.1922 17.6103 19.083 17.4665 19.0015C16.9374 18.7892 15.5029 18.1511 14.3595 17.0426C12.9453 15.6718 12.8623 15.2001 12.5959 14.7803C12.3828 14.4444 12.5392 14.2384 12.6172 14.1483C12.9219 13.7968 13.3426 13.254 13.5313 12.9843C13.7199 12.7145 13.5702 12.305 13.4803 12.05C13.0938 10.953 12.7663 10.0347 12.5 9.49989Z"
                fill="white"
            />
            <defs>
                <linearGradient id="paint0_linear" x1="26.5" y1="7" x2="4" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5BD066" />
                    <stop offset="1" stopColor="#27B43E" />
                </linearGradient>
            </defs>
        </svg>
    );

    const PdfIcon = () => (
        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16c0 1.1.9 2 2 2h12a2 2 0 002-2V8l-6-6zm1 7V3.5L18.5 9H15z" />
        </svg>
    );
    const GithubIcon = () => {
        return (
            <svg
                width="32px"
                height="32px"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="github-icon"
            >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 
        6.53 5.47 7.59.4.07.55-.17.55-.38 
        0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
        -.01-.53.63-.01 1.08.58 1.23.82.72 
        1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2
        -3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 
        0 0 .67-.21 2.2.82a7.46 7.46 0 0 1 2-.27c.68 0 1.36.09 
        2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 
        2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 
        3.75-3.65 3.95.29.25.54.73.54 1.48 
        0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 
        8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
        );
    };



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
                            <Link href={"/blogs"} className="bg-gray-900 text-white px-4 py-1 cursor-pointer rounded text-xs mr-2">Back</Link>
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
                                {nonYouTubeRows.length > 0 && (

                                    <table className="min-w-full table-auto border border-gray-300 rounded-lg">
                                        <thead>
                                            <tr className="bg-gray-100 text-gray-700">
                                                {blogDetails.table_data?.columns.map((heading, index) => (
                                                    <th key={index} className="text-start p-3">
                                                        {heading}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {nonYouTubeRows.map((row, index) => {
                                                const type = getLinkType(row.link);

                                                let IconComponent = LinkIcon;
                                                if (type === "whatsapp") IconComponent = WhatsAppIcon;
                                                if (type === "github") IconComponent = GithubIcon;


                                                return (
                                                    <tr key={index} className="border-t hover:bg-gray-50 transition">
                                                        <td className="p-3">{row.title}</td>

                                                        <td className="p-3">
                                                            <a
                                                                href={row.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex justify-center items-center"
                                                            >
                                                                <IconComponent />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            {/* {nonYouTubeRows.map((row: TableRow, index: number) => (

                                            <tr key={rowIndex} className="border-t hover:bg-gray-50 transition">
                                                <td key={colIndex} className="p-3 font-medium text-center">

                                                    <a
                                                        href={item}
                                                        className="text-blue-400 underline cursor-pointer"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Click Here
                                                    </a>

                                                </td>

                                            </tr>

 )} */}


                                        </tbody>

                                    </table>

                                )}
                                {(() => {
                                    const youtubeVideos = blogDetails.table_data?.rows
                                        .filter((row) => {
                                            const url = row[row.length - 1];
                                            return (
                                                typeof url === "string" &&
                                                (url.includes("youtube.com") || url.includes("youtu.be"))
                                            );
                                        })
                                        .map((row) => ({
                                            title: row[0], // use Title column
                                            url: row[row.length - 1],
                                        }));

                                    if (!youtubeVideos || youtubeVideos.length === 0) return null;

                                    return (
                                        <div className="mt-10  border-b border-gray-400">
                                            <h2 className="text-2xl font-medium py-4 underline">
                                                Youtube Video's
                                            </h2>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                                {youtubeVideos.map((video, index) => (
                                                    <div key={index} className="bg-white p-4">
                                                        <h3 className="text-lg font-medium mb-3">
                                                            {video.title}
                                                        </h3>

                                                        <YoutubeMiniFrame url={video.url} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>
                            {tags && tags.length > 0 && (

                                <div className="">

                                    <h2 className="text-2xl font-medium py-4 underline">
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
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="text-end">
                        <Link href={'/blogs'} className="border border-brandRed py-1 px-3  text-brandRed font-medium rounded transition  cursor-pointer gap-1">Back to Blogs</Link>
                    </div>

                </div>

                {/* Sidebar h-[calc(100vh-95px)] */}
                <div className="hidden lg:block col-span-3 p-4 bg-[#f2f2f2]">
                    <div className="sticky top-0  overflow-y-auto sidebar-scroll">

                        {relatedPosts.length > 0 && (
                            <RelatatedPosts
                                posts={relatedClean}
                                heading={`More in ${blogDetails.category}`}
                            />
                        )}
                    </div>
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
