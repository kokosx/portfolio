import type { Metadata } from "next";
import { Roboto_Serif, Space_Grotesk } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const spaceGrotesk = Space_Grotesk({
  variable: "--space-grotesk",
  subsets: ["latin"],
});

const robotoSerif = Roboto_Serif({
  variable: "--roboto-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "B.KOKOSZEWSKI — Loud Work, Clean Code",
  description:
    "A fullstack dev who ships fast, sweats details, and builds systems that bite back.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const locales = routing.locales as readonly string[];

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body
        className={`${spaceGrotesk.variable} ${robotoSerif.variable} antialiased bg-background-light dark:bg-background-dark text-gray-900 dark:text-off-white font-display`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
