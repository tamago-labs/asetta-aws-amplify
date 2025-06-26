

import { Providers } from "./providers";
import { Inter } from "next/font/google"; 

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <Providers>
            <div className={`${inter.className} min-h-screen bg-white text-black `}>
                {children}
            </div>
        </Providers>
    )
}
