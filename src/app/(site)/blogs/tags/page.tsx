import { listBlogs } from "@/data/blog";
import BlogList from "@/components/blog/BlogList";
import Script from "next/script";

export const revalidate = 300;

export async function generateMetadata({ searchParams }: { searchParams: { tag?: string } }) {
  const { tag } = await searchParams;
  const tagName = tag || "All";
  const title = `${tagName} Articles | Blog | UniqJobs`;
  const description = `Read latest posts and guides related to ${tagName}. Stay updated on ${tagName} topics.`;
  const url = `https://www.uniqjobs.co.in/blogs/tags/tag=${tagName}`;
  const image = "/images/clsBala.webp";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", images: [{ url: image }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function page({ searchParams }: { searchParams: { tag?: string } }) {

  const { tag } = await searchParams;
  let urlParam = "";
  if (tag) urlParam = `&tag=${encodeURIComponent(tag)}`;
  const data = await listBlogs(1, 50, urlParam);

  return (
    <>

      <Script id="ld-category" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify((() => {
          interface BlogPost { title: string; slug: string; }
          interface SchemaBlogPosting { "@type": "BlogPosting"; headline: string; url: string; position: number; }
          interface CollectionSchema { "@context": string; "@type": "CollectionPage"; name: string; description: string; mainEntity: SchemaBlogPosting[]; }

          const mainEntity: SchemaBlogPosting[] = data.data.map((p: BlogPost, i: number) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `https://www.uniqjobs.co.in/blog/${p.slug}`,
            position: i + 1,
          }));

          const collection: CollectionSchema = {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${tag} Articles`,
            description: `Browse all ${tag} related blogs and tutorials.`,
            mainEntity,
          };

          return collection;
        })())}
      </Script>

      <BlogList blogs={data.data} crumb={tag || "All Tags"} />
    </>
  );
}
