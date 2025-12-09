import { notFound } from "next/navigation";
import Script from "next/script";
import CourseBanner from "@/components/courses/CourseBanner"
import { getCourseDetail, getAllSlugs, loadSyllabus } from "@/data/course"
import SyllabusSection from "@/components/courses/SyllabusSection";
import AfterComplete from "@/components/courses/AfterComplete";
import FaqSection from "@/components/ui/Faq";
import WhyChoose from "@/components/courses/WhyChoose";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((course) => ({ course }));
}

export async function generateMetadata({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params;
  const detail = await getCourseDetail(course);

  const title = detail?.seo?.title || detail?.title;
  const description = detail?.seo?.description || detail?.subtitle;
  const keywords = detail?.seo?.keywords || [];
  const url = `https://www.uniqjobs.co.in/courses/${course}`;
  const ogImage = detail?.banner?.bgImageUrl;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: [{ url: ogImage }] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export default async function CoursePage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params;
  const detail = await getCourseDetail(course);
  const syllabus = await loadSyllabus(course);

  if (!detail) return notFound();

  return (
    <>
      <Script id="ld-course" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          "name": detail?.title,
          "description": detail?.subtitle,
          "provider": { "@type": "Organization", "name": "UniqJobs", "url": "https://www.uniqjobs.co.in" },
          "url": `https://www.uniqjobs.co.in/courses/${course}`
        })}
      </Script>

      <CourseBanner
        title={detail?.seo?.title}
        subtitle={detail.subtitle}
        bgImageUrl={detail.banner?.bgImageUrl}
        youtubeId={detail.banner?.youtubeId}
        applyHref={detail.banner?.applyHref}
      />
      <AfterComplete
        title={detail.afterCompleted?.title}
        description={detail.afterCompleted?.description}
        postion={detail.afterCompleted?.position}
        companies={detail.afterCompleted?.companies}
      />
      <WhyChoose cardData={detail.whychoose} />
      <SyllabusSection MODULES={syllabus.syllabus} />
      <FaqSection faqs={detail.faq} />
      <Script id="ld-faq" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": detail.faq.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": { "@type": "Answer", "text": f.answer }
          }))
        })}
      </Script>
    </>
  )
}



