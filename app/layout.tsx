import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Asseta - Multi-Agent RWA Tokenization Platform",
  description: "Revolutionizing real-world asset tokenization through multi-agent AI automation. Deploy complete RWA projects in minutes with specialized AI agents handling tokenization, legal compliance, and KYC.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-white text-black">
          <Header/>
          {children}
          <Footer/>

        </div>

      </body>
    </html>
  );
}
