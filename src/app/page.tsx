import AboutSection from "@/components/home/AboutSection";
import Banner from "@/components/home/Banner";
import { Metadata } from "next";
import Script from "next/script";
import CourseSection from "@/components/home/CourseSection";
import ProcessSection from "@/components/home/ProcessSection";
import dynamic from "next/dynamic";
import StruggleSuccessSection from "@/components/home/StruggleSuccessSection";
import ContactForm from "@/components/contact/ContactSection";
const ShortsSection = dynamic(() => import("@/components/shorts/ShortsSection"));

const seoTitle = "Best Software Training with Placement Institute in chennai | UniqJobs"
const seoDescription = "Start your IT career with UniqJobs in Chennai. Get real-time project training from industry experts and benefit from 100% placement assistance."
const seoUrl = "https://www.uniqjobs.co.in/"
const seoImg = "/images/cta-cover.webp"
const keyWords = ["Career gap, Non-IT, Freshers, IT career, placements"]

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  keywords: keyWords,
  alternates: { canonical: seoUrl },
  openGraph: { title: seoTitle, description: seoDescription, url: seoUrl, images: [{ url: seoImg }], type: "website" },
  twitter: { card: "summary_large_image", title: seoTitle, description: seoDescription, images: [seoImg] },
};

export default async function Home() {

  return (
    <>
      <Script id="ld-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://www.uniqjobs.co.in/#website",
              "name": "UniqJobs",
              "url": "https://www.uniqjobs.co.in",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.uniqjobs.co.in/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@type": "Organization",
              "@id": "https://www.uniqjobs.co.in/#organization",
              "name": "UniqJobs",
              "url": "https://www.uniqjobs.co.in",
              "logo": "/uniqjobs.svg",
              "sameAs": [
                "https://www.youtube.com/@uniqtechnologiesofficial",
                "https://in.linkedin.com/company/uniq-technologies",
                "https://www.instagram.com/uniqtechs",
                "https://www.facebook.com/uniqtechnologies",
                "https://t.me/uniqtechnologies",
                "https://t.me/uniqtechnologiestechsupport",
                "https://www.whatsapp.com/channel/0029VaVHxq18fewtwSwKdo3h",
                "https://x.com/UNIQTechs"
              ]
            }
          ]
        })}
      </Script>

      <Banner />
      <AboutSection />
      <CourseSection />
      <ProcessSection />
      <StruggleSuccessSection />
      <ShortsSection variant="home" />
      <ContactForm />

    </>
  );
}