import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import VisitorTracker from "@/components/VisitorTracker";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono-jb",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://applyidponline.com"),
  title: {
    default: "Apply IDP Online | International Driving Permit Application",
    template: "%s | IDP Online",
  },
  description:
    "Apply for your International Driving Permit online in three simple steps. A private, guided application service — no embassy visit, no appointment.",
  openGraph: {
    siteName: "Apply IDP Online",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-81GM8WST70"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-81GM8WST70');
          `}
        </Script>
        <a href="#main-content" className="visually-hidden">
          Skip to main content
        </a>
        <AnnouncementBar />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <VisitorTracker />
      </body>
    </html>
  );
}
