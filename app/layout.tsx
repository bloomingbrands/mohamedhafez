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

export const metadata: Metadata = {
  metadataBase: new URL("https://beingmohamedhafez.com"),
  title: {
    default: "Mohamed Hafez — Full Stack Developer",
    template: "%s | Mohamed Hafez",
  },
  description:
    "Full Stack JavaScript Developer with 8+ years of enterprise systems engineering. React, Next.js, Node.js, TypeScript, AI integrations (OpenAI, Anthropic, DeepSeek), and Hedera blockchain.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js",
    "TypeScript",
    "AI Integrations",
    "OpenAI",
    "Anthropic",
    "Hedera Blockchain",
    "Systems Engineer",
    "Mohamed Hafez",
    "Lowell MA",
    "Web Developer",
  ],
  authors: [{ name: "Mohamed Hafez", url: "https://beingmohamedhafez.com" }],
  creator: "Mohamed Hafez",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://beingmohamedhafez.com",
    siteName: "Mohamed Hafez",
    title: "Mohamed Hafez — Full Stack Developer",
    description:
      "Full Stack JavaScript Developer specializing in React, Next.js, Node.js, AI integrations, and Hedera blockchain. 8+ years enterprise systems engineering.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Mohamed Hafez — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Hafez — Full Stack Developer",
    description:
      "Full Stack JavaScript Developer specializing in React, Next.js, Node.js, AI integrations, and Hedera blockchain.",
    creator: "@jamstack_blocks",
    images: ["/opengraph-image"],
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
