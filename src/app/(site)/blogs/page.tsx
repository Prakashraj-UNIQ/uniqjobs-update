import { listBlogs } from "@/data/blog";
import Script from "next/script";
import BlogList from "@/components/blog/BlogList";

export const revalidate = 300;

export async function generateMetadata() {
  const title = "IT Blogs & Technology | UniqJobs";
  const description = "Explore the latest IT career tips and tricks from UniqJobs experts. Updated weekly with real industry guidance.";
  const url = "https://www.uniqjobs.co.in/blogs";
  const image = "/images/clsBala.webp";
  const keyWords = ["IT career tips, IT career, experts, guidance, blogs, blog"];

  return {
    title,
    description,
    keyWords,
    url,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", images: [{ url: image }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function BlogsPage() {

  const data = await listBlogs(1, 50);

  return (
    <>
      <Script id="ld-blog-list" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "UniqJobs Blog",
          "description": "Latest IT tips, tutorials, and career guides.",
          "url": "https://www.uniqjobs.co.in/blogs",
          "publisher": { "@type": "Organization", "name": "UniqJobs", "url": "https://www.uniqjobs.co.in" }
        })}
      </Script>

      <BlogList blogs={data.data} crumb="All Blogs" />
    </>
  );
}
