import Link from 'next/link';


const Footer = () => {
    return (
        <footer className="border-t border-gray-200 py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="text-xl font-light mb-4">ASETTA</div>
                        <p className="text-sm text-gray-600 font-light">
                            Revolutionizing real-world asset tokenization through multi-agent AI automation
                        </p>
                    </div>
                    <div>
                        <h4 className="font-light mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm font-light text-gray-600">
                            <li><Link href="/projects" className="hover:text-black transition-colors">Browse Projects</Link></li>
                            <li><Link href="/tokenize" className="hover:text-black transition-colors">Tokenize Assets</Link></li>
                            <li><Link href="/desktop" className="hover:text-black transition-colors">Desktop App</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-light mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm font-light text-gray-600">
                            <li><Link href="/docs" className="hover:text-black transition-colors">Documentation</Link></li>
                            <li><Link href="/support" className="hover:text-black transition-colors">Support</Link></li>
                            <li><Link href="/blog" className="hover:text-black transition-colors">Blog</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-light mb-4">Company</h4>
                        <ul className="space-y-2 text-sm font-light text-gray-600">
                            <li><Link href="/about" className="hover:text-black transition-colors">About</Link></li>
                            <li><Link href="/careers" className="hover:text-black transition-colors">Careers</Link></li>
                            <li><Link href="/contact" className="hover:text-black transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-200 mt-12 pt-8 text-center">
                    <p className="text-sm text-gray-600 font-light">
                        © 2025 Asetta. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer