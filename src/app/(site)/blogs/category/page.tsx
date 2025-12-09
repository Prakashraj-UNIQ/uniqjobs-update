import { listBlogs } from "@/data/blog";
import Script from "next/script";
import BlogList from "@/components/blog/BlogList";

export const revalidate = 300;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const { category } = await searchParams;
  const cat = category || "All";

  const title = `${cat} Articles | Blog | UniqJobs`;
  const description = `Read latest posts and guides related to ${cat}. Stay updated on ${cat} topics.`;
  const url = `https://www.uniqjobs.co.in/blogs/categories/category=${cat}`;
  const image = "/images/clsBala.webp";

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const { category } = await searchParams;

  const filter = category ? `&category=${category}` : "";
  const data = await listBlogs(1, 50, filter);

  return (
    <>
      <Script id="ld-category" type="application/ld+json" strategy="afterInteractive">
        {(() => {
          interface BlogItem {
            title: string;
            slug: string;
            [key: string]: unknown;
          }

          interface BlogPosting {
            "@type": "BlogPosting";
            headline: string;
            url: string;
            position: number;
          }

          interface CollectionPage {
            "@context": string;
            "@type": string;
            name: string;
            description: string;
            mainEntity: BlogPosting[];
          }

          const mainEntity: BlogPosting[] = (data.data as BlogItem[]).map(
            (p, i: number) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: `https://www.uniqjobs.co.in/blog/${p.slug}`,
              position: i + 1,
            })
          );

          const ld: CollectionPage = {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${category || "All"} Articles`,
            description: `Browse all ${category || "All"} related blogs and tutorials.`,
            mainEntity,
          };

          return JSON.stringify(ld);
        })()}
      </Script>

      <BlogList blogs={data.data} crumb={category || "All Categories"} />
    </>
  );
}
