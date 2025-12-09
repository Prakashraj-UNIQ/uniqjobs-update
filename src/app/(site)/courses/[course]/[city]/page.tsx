import { notFound } from "next/navigation";
import Script from "next/script";
import { getCourseDetail, getAllSlugs, loadSyllabus } from "@/data/course";
import { COURSE_LOCATIONS, locSlug } from "@/data/courseNav";
import CourseBanner from "@/components/courses/CourseBanner";
import FaqSection from "@/components/ui/Faq";
import WhyChoose from "@/components/courses/WhyChoose";
import AfterComplete from "@/components/courses/AfterComplete";
import SyllabusSection from "@/components/courses/SyllabusSection";
import LocationContact from "@/components/contact/LocationContact";
import locations from "@/data/locations";
import LocationCourses from "@/components/courses/LocationCourses";

export async function generateStaticParams() {
    const courses = await getAllSlugs();
    return courses.flatMap((course) =>
        (COURSE_LOCATIONS[course] ?? []).map((city) => ({
            course,
            city: locSlug(city),
        }))
    );
}

export async function generateMetadata({ params }: { params: Promise<{ course: string; city: string }> }) {
    const { course, city } = await params;
    const detail = await getCourseDetail(course);


    const cityName = COURSE_LOCATIONS[course]?.find(c => locSlug(c) === city) ?? city;
    const citySEO = detail?.locationsSEO?.[city];

    const title = citySEO?.title ?? `${detail?.title} in ${cityName} | UniqJobs`;
    const description = citySEO?.description ?? `${detail?.subtitle} — Available in ${cityName}.`;
    const url = `https://www.uniqjobs.co.in/courses/${course}/${city}`;
    const ogImage = detail?.banner?.bgImageUrl;

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: { title, description, url, images: [{ url: ogImage }] },
        twitter: { card: "summary_large_image", title, description, images: [ogImage] },
    };
}

export default async function CityCoursePage({
    params,
}: {
    params: Promise<{ course: string; city: string }>;
}) {
    const { course, city } = await params;
    const syllabus = await loadSyllabus(course);

    const detail = await getCourseDetail(course);
    if (!detail) return notFound();

    const cityName = Object.values(COURSE_LOCATIONS[course]).find(
        (c) => locSlug(c) === city
    );

    if (!cityName) return notFound();
    const locationDetails = locations[city as keyof typeof locations];

    return (
        <>
            <Script id="ld-course-city" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Course",
                    "name": `${detail?.title} in ${cityName}`,
                    "description": detail?.subtitle,
                    "provider": { "@type": "Organization", "name": "UniqJobs", "url": "https://www.uniqjobs.co.in" },
                    "areaServed": cityName,
                    "url": `https://www.uniqjobs.co.in/courses/${course}/${city}`
                })}
            </Script>
            <CourseBanner
                title={detail?.locationsSEO?.[city]?.title ?? `${detail?.title}`}
                subtitle={`${detail?.subtitle} — Available in ${cityName}`}
                bgImageUrl={detail.banner?.bgImageUrl || "/images/default.webp"}
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
            <LocationCourses data={locationDetails?.courses} city={cityName} />
            <FaqSection faqs={detail.faq} />
            <LocationContact {...locationDetails} city={cityName} course={detail.courseTitle} />
        </>
    );
}
