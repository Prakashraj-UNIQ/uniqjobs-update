import CourseCard from "@/components/ui/cards/CourseCard";
import { getCourseIndex } from "@/data/course";
import { courseListJsonLd } from "@/lib/seo";
import { Metadata } from "next";

export const revalidate = 3600;

const seoTitle = "Best Software Courses in 2026 | Uniq Jobs"
const seoDescription = "Explore the most in-demand software courses for 2026, including Full Stack Development, Data Science, AI, DevOps, Cloud, and more. Start you career today."
const seoUrl = "https://www.uniqjobs.co.in/courses/"
const seoImg = "/images/clsBala.webp"

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  alternates: { canonical: seoUrl },
  openGraph: { title: seoTitle, description: seoDescription, url: seoUrl, images: [{ url: seoImg }] },
  twitter: { card: "summary_large_image", title: seoTitle, description: seoDescription, images: [seoImg] },
};

export default async function CoursesIndex() {
  const list = await getCourseIndex();
  const jsonLd = courseListJsonLd(list);

  return (
    <main className="bg-[#f2f2f2] mt-15 sm:mt-0 py-10 px-2 sm:px-10 lg:px-20">
      <h1 className="px-4 text-black text-3xl lg:text-5xl text-center fold-primary font-black pb-10">
        What You’ll <span className="">Learn with Us?</span>
      </h1>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {list.map((c) => (
          <CourseCard
            key={c.slug}
            courseTitle={c.title}
            courseSalary={c.avgSalary}
            courseDescription={c.description}
            icon={c.icon}
            cta={c.cta}
          />
        ))}
      </ul>
    </main>
  );
}
