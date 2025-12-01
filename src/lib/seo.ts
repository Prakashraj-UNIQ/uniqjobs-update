// lib/seo.ts
export const SITE = {
  name: "UniqJobs",
  baseUrl: "https://www.uniqjobs.co.in",
  defaultOg: "/images/og-default.png",
};

export function buildCourseMetadata(course: {
  slug: string;
  title: string;
  subtitle?: string;
  seo?: { title?: string; description?: string };
  banner?: { heroImage?: string };
}) {
  const url = `${SITE.baseUrl}/courses/${course.slug}`;
  const title = course.seo?.title ?? `${course.title} | ${SITE.name}`;
  const description = course.seo?.description ?? course.subtitle ?? "";
  const ogImage = course.banner?.heroImage ?? SITE.defaultOg;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function courseJsonLd(course: {
  slug: string;
  title: string;
  description?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description ?? "",
    url: `${SITE.baseUrl}/courses/${course.slug}`,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.baseUrl },
  };
}

export function courseListJsonLd(cards: { slug: string; title: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: cards.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.baseUrl}/courses/${c.slug}`,
      name: c.title,
    })),
  };
}
