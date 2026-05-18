import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | SEO CMS",
    default: "SEO CMS",
  },
  description: "A fast, SEO-optimized content publishing platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="bg-white text-gray-900 antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}