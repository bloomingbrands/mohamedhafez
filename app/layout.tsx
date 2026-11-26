import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohamed Hafez — Web Developer & Cloud Systems Engineer",
  description:
    "Mohamed Hafez builds scalable web apps, cloud systems, and digital experiences. Explore selected work, experience, and resume.",
  metadataBase: new URL("https://beingmohamedhafez.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
