import { Scrollable } from "@/components/Scrollable";
import { cn } from "@/utils/tailwind";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Figtree } from "next/font/google";
import localFont from "next/font/local";
import "overlayscrollbars/overlayscrollbars.css";
import "react-tippy/dist/tippy.css";
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

// eslint-disable-next-line import/no-unused-modules
export const metadata: Metadata = {
  title: "Richard's portfolio",
  description: "This is a portfolio website for Richard, a frontend engineer.",
};

// eslint-disable-next-line import/no-unused-modules
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth" data-overlayscrollbars-initialize>
      <body
        className={cn(eugusto.variable, figtree.className, "bg-greyTones-300 text-darkColors-900")}
        data-overlayscrollbars-initialize
      >
        <NextIntlClientProvider messages={messages}>
          <Scrollable />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
