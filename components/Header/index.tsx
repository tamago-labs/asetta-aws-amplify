"use client"

import React from 'react';
import { usePathname } from 'next/navigation'
import Link from 'next/link';

const Header = () => {
    const pathname = usePathname();

    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-2xl font-light tracking-tight">ASETTA</Link>
                    <nav className="hidden md:flex space-x-8">
                        <Link
                            href="/"
                            className={`text-sm font-light transition-colors ${pathname === '/'
                                ? 'text-black border-b border-black'
                                : 'text-gray-600 hover:text-black'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/projects"
                            className={`text-sm font-light transition-colors ${pathname === '/projects' || pathname.startsWith('/project/')
                                ? 'text-black border-b border-black'
                                : 'text-gray-600 hover:text-black'
                                }`}
                        >
                            Projects
                        </Link>
                        {/*<Link
                            href="/about"
                            className={`text-sm font-light transition-colors ${pathname === '/about'
                                ? 'text-black border-b border-black'
                                : 'text-gray-600 hover:text-black'
                                }`}
                        >
                            About
                        </Link>*/}
                        <Link
                            href="https://github.com/tamago-labs/asetta"
                            target="_blank"
                            className={`text-sm font-light transition-colors text-gray-600 hover:text-black`}
                        >
                            GitHub
                        </Link>
                    </nav>
                    <Link href="/dashboard" >
                        <button className="bg-black cursor-pointer  text-white px-6 py-2 text-sm font-light hover:bg-gray-800 transition-colors">
                            Dashboard
                        </button>
                    </Link> 
                </div>
            </div>
        </header>
    );
};

export default Header;