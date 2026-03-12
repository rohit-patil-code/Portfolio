import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Starfield } from "@/components/ui/Starfield";
import { CosmicCursorAura } from "@/components/ui/CosmicCursorAura";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Portfolio | Full Stack Developer",
  description: "Portfolio of a Final Year CSE Student & Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${outfit.variable} font-sans antialiased bg-background text-foreground transition-colors duration-500`}
      >
        <CosmicCursorAura />
        <Starfield />
        <Navbar />
        <main className="flex min-h-screen flex-col relative z-0">
          {children}
        </main>
      </body>
    </html>
  );
}
