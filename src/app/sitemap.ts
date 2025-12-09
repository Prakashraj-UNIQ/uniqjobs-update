// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/data/course";
import { COURSE_LOCATIONS, locSlug } from "@/data/courseNav";
import { listBlogs, listCategories, listTags } from "@/data/blog";



const SITE = "https://www.uniqjobs.co.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  /* ------------------ STATIC PAGES ------------------ */
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    { url: `${SITE}/contact-us`, lastModified: now },
    { url: `${SITE}/placements/students-review`, lastModified: now },
    { url: `${SITE}/courses`, lastModified: now },
    { url: `${SITE}/blogs`, lastModified: now },
  ];

  /* ------------------ COURSES ------------------ */
  const slugs = await getAllSlugs();

  const coursePages = slugs.map((course) => ({
    url: `${SITE}/courses/${course}`,
    lastModified: now,
  }));

  const cityPages = slugs.flatMap((course) =>
    (COURSE_LOCATIONS[course] ?? []).map((city) => ({
      url: `${SITE}/courses/${course}/${locSlug(city)}`,
      lastModified: now,
    }))
  );

  /* ------------------ BLOG POSTS ------------------ */
  const postRes = await listBlogs(1, 50);
  const posts = Array.isArray(postRes.posts) ? postRes.posts : [];
  interface BlogPost {
    slug: string;
    updatedAt?: string;
    publishedAt?: string;
  }

  const postUrls = posts.map((p: BlogPost) => ({
    url: `${SITE}/blog/${p.slug}`,
    lastModified: p.updatedAt
      ? new Date(p.updatedAt)
      : new Date(p.publishedAt || now),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

 /* ------------------ CATEGORIES ------------------ */
const catRes = await listCategories();
const categories = catRes?.data ?? [];

const catUrls = categories.map((c: string | { name: string }) => {
  const name = typeof c === "string" ? c : c.name;

  return {
    url: `${SITE}/blogs/category/?category=${encodeURIComponent(name)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  };
});

/* ------------------ TAGS ------------------ */
const tagRes = await listTags();
const tags = tagRes?.data ?? [];

const tagUrls = tags.map((t: string | { name: string }) => {
  const name = typeof t === "string" ? t : t.name;

  return {
    url: `${SITE}/blogs/tags/?tag=${encodeURIComponent(name)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  };
});


  /* ------------------ FINAL RETURN ------------------ */
  return [
    ...staticPages,
    ...coursePages,
    ...cityPages,
    ...postUrls,
    ...catUrls,
    ...tagUrls,
  ];
}
