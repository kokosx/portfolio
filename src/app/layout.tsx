import type { Metadata } from "next";
import { Roboto_Serif, Space_Grotesk } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${robotoSerif.variable} antialiased bg-background-light dark:bg-background-dark text-gray-900 dark:text-off-white font-display  `}
      >
        {children}
      </body>
    </html>
  );
}
