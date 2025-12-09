import ContactForm from '@/components/contact/ContactSection'
import { Metadata } from 'next';
import Script from 'next/script';


const seoTitle = "Contact Us | UniqJobs"
const seoDescription = "Start your IT career with UniqJobs in Chennai. Get real-time project training from industry experts and benefit from 100% placement assistance."
const seoUrl = "https://www.uniqjobs.co.in/contact-us"
const seoImg = "/images/clsBala.webp"
const keyWords = [" Non-IT, Freshers, IT career, placements, careers, industry experts, software Training, branch"]

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  keywords:keyWords,
  alternates: { canonical: seoUrl },
  openGraph: { title: seoTitle, description: seoDescription, url: seoUrl, images: [{ url: seoImg }] },
  twitter: { card: "summary_large_image", title: seoTitle, description: seoDescription, images: [seoImg] },
};

const page = () => {
  return (
    <>
      <Script
        id="ld-contact-page"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact UniqJobs",
          "url": "https://www.uniqjobs.co.in/contact-us",
          "about": {
            "@type": "Organization",
            "name": "UniqJobs",
            "url": "https://www.uniqjobs.co.in"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-96001-14466",
            "contactType": "customer service",
            "areaServed": "IN",
            "availableLanguage": ["en", "ta"]
          }
        })}
      </Script>

      <ContactForm />
    </>
  )
}

export default page