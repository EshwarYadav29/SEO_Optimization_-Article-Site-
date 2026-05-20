import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | The Blog",
    default: "The Blog — Fresh Articles & Insights",
  },
  description:
    "A fast, SEO-optimized content publishing platform delivering fresh articles and insights.",
  metadataBase: new URL("https://seo-cms-07f9.onrender.com"),
  openGraph: {
    type: "website",
    siteName: "The Blog",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body suppressHydrationWarning className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}