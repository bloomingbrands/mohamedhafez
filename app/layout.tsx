import type { Metadata } from "next";
import site from "@/site.config";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.person.url),
  title: site.person.title,
  description: site.person.description,
  applicationName: "Mohamed Hafez Portfolio",
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/rss.xml" },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Mohamed Hafez",
    title: site.person.title,
    description: site.person.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.person.title,
    description: site.person.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleTagManager gtmId="GTM-W9MN8NJD" />
      </body>
    </html>
  );
}
