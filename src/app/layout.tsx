import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";
import CtaBanner from "@/components/layout/CtaBanner";
import Footer from "@/components/layout/Footer";
import { Metadata } from "next";
import ScrollToTop from "@/components/common/ScrollToTop"

const outFit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://uniqjobs.co.in")
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

      <body className={`${outFit.className} `}>

        <Header />
        <ThemeProvider>
          <Navbar />
          <ScrollToTop />
        </ThemeProvider>
        {children}
        <CtaBanner />
        <Footer />
      </body>
    </html>
  );
}
