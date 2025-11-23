import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";
import CtaBanner from "@/components/layout/CtaBanner";
import Footer from "@/components/layout/Footer";
import { Metadata } from "next";
import ScrollToTop from "@/components/common/ScrollToTop"
import GlobalContactTrigger from "@/components/layout/GlobalContactTrigger";
import Script from "next/script";

const outFit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.uniqjobs.co.in")
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <link rel="icon" href="/uniqjobs.svg" type="image/svg+xml" />
      <link rel="preconnect" href="https://i.ytimg.com" />
      <link rel="preconnect" href="https://www.youtube-nocookie.com" />
      <link rel="dns-prefetch" href="https://i.ytimg.com" />
      <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '250283863265561');
    fbq('track', 'PageView');
  `}
      </Script>


      <body className={`${outFit.className} `}>

        <Header />
        <ThemeProvider>
          <Navbar />
          <ScrollToTop />
        </ThemeProvider>
        {children}
        <GlobalContactTrigger />
        <CtaBanner />
        <Footer />

        <noscript>
          <img height="1" width="1" style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=250283863265561&ev=PageView&noscript=1"
          />
        </noscript>
        <meta name="google-site-verification" content="mAXpmRzrPAJC52YoePoq9bTX2OUpTJL1oOS69lYmnX0" />
      </body>
    </html>
  );
}
