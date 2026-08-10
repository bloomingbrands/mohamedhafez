import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = "Mohamed Hafez — Full-Stack Developer & Systems Engineer";
const siteDescription =
  "Mohamed Hafez is a full-stack developer and systems engineer in Lowell, MA. React, Next.js, Node.js, TypeScript, AI agents, plus enterprise identity, cloud, and endpoint engineering.";

export const metadata: Metadata = {
  metadataBase: new URL("https://beingmohamedhafez.com"),
  title: {
    default: siteTitle,
    template: "%s | Mohamed Hafez",
  },
  description: siteDescription,
  keywords: [
    "Mohamed Hafez",
    "Full Stack Developer",
    "Full-Stack Developer",
    "Systems Engineer",
    "React Developer",
    "Next.js Developer",
    "Node.js",
    "TypeScript",
    "AI Integrations",
    "OpenAI",
    "Anthropic",
    "Hedera Blockchain",
    "Azure Entra ID",
    "Microsoft Intune",
    "Endpoint Management",
    "Lowell MA",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Mohamed Hafez", url: "https://beingmohamedhafez.com" }],
  creator: "Mohamed Hafez",
  publisher: "Mohamed Hafez",
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://beingmohamedhafez.com",
    siteName: "Mohamed Hafez",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description:
      "Full-stack developer and systems engineer — React, Next.js, AI agents, identity, cloud, and production ops.",
    creator: "@jamstack_blocks",
    images: ["https://beingmohamedhafez.com/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://beingmohamedhafez.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
