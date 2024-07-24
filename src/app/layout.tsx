import { Scrollable } from "@/components/Scrollable";
import { cn } from "@/utils/tailwind";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import localFont from "next/font/local";
import "overlayscrollbars/overlayscrollbars.css";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

// Eugusto is a custom font that is not available on Google Fonts
const eugusto = localFont({
  src: "../../public/fonts/eugusto.otf",
  variable: "--font-eugusto",
});

export const metadata: Metadata = {
  title: "Richard's portfolio",
  description: "This is a portfolio website for Richard, a frontend engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-overlayscrollbars-initialize>
      <body className={cn(eugusto.variable, figtree.className, "bg-greyTones-300")} data-overlayscrollbars-initialize>
        <Scrollable />
        {children}
      </body>
    </html>
  );
}
