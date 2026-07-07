import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import GSAPInitializer from "@/components/GSAPInitializer";
import TopNavBar from "@/components/TopNavBar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Ingraham Methodist Church",
  description: "A Place of Peace and Purpose",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} antialiased`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col font-body-md text-body-md">
        <GSAPInitializer />
        <TopNavBar />
        <main className="flex-grow pt-[72px]">
          {children}
        </main>
      </body>
    </html>
  );
}
