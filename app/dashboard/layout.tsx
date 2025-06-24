

import { Providers } from "../providers";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <Providers>
            <div className={`${inter.className} min-h-screen bg-white text-black `}>
                <Header />
                {children}
                <Footer />
            </div>
        </Providers>
    )
}
