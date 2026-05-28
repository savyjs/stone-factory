import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Manrope,
  Noto_Sans_Arabic,
  Noto_Sans_Armenian,
} from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

const notoArmenian = Noto_Sans_Armenian({
  variable: "--font-armenian",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Berlian Stone Factory",
  description:
    "Multi-language stone factory website for façade stones, flooring, stairs, export-ready travertine, marble, and CNC Roman stone production in Qom, Iran.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${cormorant.variable} ${notoArabic.variable} ${notoArmenian.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
