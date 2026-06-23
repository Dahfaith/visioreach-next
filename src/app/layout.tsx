import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import type { Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#FF6B2B",
};

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "VisioReach Concepts | Premium Web Developer & Digital Brand | Lagos Nigeria",
  description: "VisioReach Concepts – Premium web development, custom web applications, and digital branding for businesses and corporate companies across Lagos, Ibadan, Ogbomosho, Osogbo, and Ekiti.",
  keywords: "web developer lagos, business website design ibadan, web application development ogbomosho, company website creator osogbo, e-commerce developer ekiti, custom software development nigeria, corporate website builder lagos, portfolio web designer ibadan, visioreach concepts",
  authors: [{ name: "VisioReach Concepts" }],
  openGraph: {
    title: "VisioReach Concepts – Corporate Web & App Development",
    description: "Crafting premium websites and feature-rich web applications for companies across Lagos, Ibadan, Ogbomosho, Osogbo, and Ekiti.",
    url: "https://visioreach.co",
    siteName: "VisioReach Concepts",
    images: [{ url: "https://visioreach.co/assets/images/og-image.jpg" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@visioreach",
    title: "VisioReach Concepts – Premium Web Developer",
    description: "Crafting premium websites & digital experiences for modern brands.",
    images: ["https://visioreach.co/assets/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js" async></script>
      </head>
      <body className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable} bg-bone text-ink-950 font-sans antialiased noise`}>
        {children}
        <Analytics />
        <Script src="/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
