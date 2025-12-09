import ShortsSection from "@/components/shorts/ShortsSection";
import { Metadata } from "next";
import Script from "next/script";

const seoTitle = "Student's Review & Placed Candidates | uniq jobs"
const seoDescription = "Watch genuine students review of Uniq Jobs and discover how our training programs have helped learners build strong careers in IT."
const seoUrl = "https://www.uniqjobs.co.in/courses/"
const seoImg = "/images/clsBala.webp"
const keyWords = ["students review, Non-IT, Freshers, IT career, placements, careers"]


export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  keywords: keyWords,
  alternates: { canonical: seoUrl },
  openGraph: { title: seoTitle, description: seoDescription, url: seoUrl, images: [{ url: seoImg }] },
  twitter: { card: "summary_large_image", title: seoTitle, description: seoDescription, images: [seoImg] },
};

export default function StudentReviewsPage() {
  return (
    <>
      <Script
        id="ld-students-review"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "UniqJobs Student Reviews",
          "url": "https://www.uniqjobs.co.in/placements/students-review",
          "description":
            "Read real reviews and success stories from UniqJobs students placed in IT companies.",
          "about": {
            "@type": "Organization",
            "name": "UniqJobs",
            "url": "https://www.uniqjobs.co.in"
          },
          "mainEntity": {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "UniqJobs",
            "url": "https://www.uniqjobs.co.in",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "bestRating": "5",
              "ratingCount": "1540"
            }
          }
        })}
      </Script>

      <main className="bg-black min-h-screen">
        <div className="pt-25 md:pt-10 pb-4 text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold">
            Student&apos;s
            <span className="bg-gradient-to-r from-[#ba181b] to-red-800 text-transparent bg-clip-text"> Review
            </span> &
            <span className="underline decoration-primary-800 underline-offset-4"> Placed
            </span>   Candidates
          </h1>
          <p className="mt-2 text-sm text-white/70">
            Real short videos from our placed students across companies.
          </p>

        </div>

        <ShortsSection variant="full" />
      </main>
    </>
  );
}
