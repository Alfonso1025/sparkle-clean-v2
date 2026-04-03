import type { Metadata } from "next";
import { Inter } from "next/font/google";
import  {Navbar} from "@/components/Navbar";
import "./globals.css";
import { ChatWidget } from "@/components/chatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sparkle Clean | Professional Cleaning Services Campbelltown",
  description: "Professional residential, commercial and end of lease cleaning services in Campbelltown NSW. Insured, eco-friendly, same-day service available.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">NEXT_PUBLIC_ENABLE_CHATBOT=true
NEXT_PUBLIC_ENABLE_QUOTE_TOOL=false
      <body className={inter.className}>
        <Navbar/>
        {children}
        {process.env.NEXT_PUBLIC_ENABLE_CHATBOT === "true" && <ChatWidget />}
      </body>
    </html>
  );
}