 
import { Building2, Users, TrendingUp, Shield, Zap, Brain, FileCheck, Bot } from 'lucide-react';
import { mockProjects } from "../../data/mockData"
import Link from 'next/link';

const LandingContainer = () => {
    return (
        <div >
            {/* Hero Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-6xl font-extralight mb-6 tracking-tight">
                        Real World Assets,<br />
                        <span className="text-gray-600">Tokenized.</span>
                    </h1>
                    <p className="text-xl font-light text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Revolutionary platform enabling fractional ownership of premium real estate through blockchain technology.
                        Multiple AI agents streamline the tokenization process for project owners.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/projects" className="bg-black text-white px-8 py-4 text-sm font-light hover:bg-gray-800 transition-colors">
                            Explore Projects
                        </Link>
                        <button className="border border-gray-300 text-black px-8 py-4 text-sm font-light hover:bg-gray-50 transition-colors">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extralight mb-4 tracking-tight">What We Do</h2>
                        <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto">
                            Context Protocol-based platform with specialized AI agents for seamless RWA tokenization
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                                <Building2 size={24} />
                            </div>
                            <h3 className="text-xl font-light mb-4">Asset Tokenization</h3>
                            <p className="text-gray-600 font-light leading-relaxed">
                                Transform real estate assets into tradeable tokens with AI-powered valuation and compliance
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                                <Users size={24} />
                            </div>
                            <h3 className="text-xl font-light mb-4">Fractional Ownership</h3>
                            <p className="text-gray-600 font-light leading-relaxed">
                                Enable multiple investors to own portions of high-value assets with lower barriers to entry
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                                <TrendingUp size={24} />
                            </div>
                            <h3 className="text-xl font-light mb-4">Yield Generation</h3>
                            <p className="text-gray-600 font-light leading-relaxed">
                                Generate passive income through rental yields and asset appreciation distributed to token holders
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Agents Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extralight mb-4 tracking-tight">MCP Multi-Agent AI System</h2>
                        <p className="text-lg font-light text-gray-600 max-w-3xl mx-auto">
                            Model Context Protocol-based collaborative AI agents that work together to complete
                            the entire tokenization process in minutes through seamless inter-agent communication
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="p-6 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                <FileCheck size={20} className="text-blue-600" />
                            </div>
                            <h3 className="text-lg font-light mb-2">Legal Agent</h3>
                            <p className="text-sm text-gray-600 font-light mb-3">
                                Collects property documentation, ensures regulatory compliance, generates legal structures
                            </p>
                            <div className="text-xs text-blue-600 font-medium">⏱️ 5-10 minutes</div>
                        </div>

                        <div className="p-6 border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <TrendingUp size={20} className="text-green-600" />
                            </div>
                            <h3 className="text-lg font-light mb-2">Valuation Agent</h3>
                            <p className="text-sm text-gray-600 font-light mb-3">
                                Performs automated asset appraisal using market data, comparable sales, and AI models
                            </p>
                            <div className="text-xs text-green-600 font-medium">⏱️ 2-5 minutes</div>
                        </div>

                        <div className="p-6 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                <Zap size={20} className="text-purple-600" />
                            </div>
                            <h3 className="text-lg font-light mb-2">Tokenization Agent</h3>
                            <p className="text-sm text-gray-600 font-light mb-3">
                                Creates smart contracts, deploys tokens, and manages blockchain integration automatically
                            </p>
                            <div className="text-xs text-purple-600 font-medium">⏱️ 3-8 minutes</div>
                        </div>

                        <div className="p-6 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                <Bot size={20} className="text-orange-600" />
                            </div>
                            <h3 className="text-lg font-light mb-2">Marketing Agent</h3>
                            <p className="text-sm text-gray-600 font-light mb-3">
                                Launches investment campaigns, creates marketing materials, manages investor outreach
                            </p>
                            <div className="text-xs text-orange-600 font-medium">⏱️ 5-10 minutes</div>
                        </div>
                    </div>

                    <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-8">
                        <div className="text-center">
                            <h3 className="text-xl font-light mb-4 text-blue-800">MCP Collaborative Workflow</h3>
                            <p className="text-blue-700 font-light mb-6 max-w-3xl mx-auto">
                                Our agents use Model Context Protocol to share context and collaborate in real-time,
                                ensuring seamless handoffs and eliminating bottlenecks in the tokenization process.
                            </p>
                            <div className="flex justify-center items-center gap-4 text-sm">
                                <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-light">Legal →</div>
                                <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-light">Valuation →</div>
                                <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-light">Tokenization →</div>
                                <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-light">Marketing</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Desktop Application Mode */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-extralight mb-6 tracking-tight">Desktop Application Mode</h2>
                            <p className="text-lg font-light text-gray-600 mb-6 leading-relaxed">
                                Powerful desktop application for RWA project owners featuring MCP-based Multi-Agent Collaborative platform.
                                Streamline the entire tokenization process from legal compliance to smart contract deployment in minutes, not months.
                            </p>
                            <p className="text-base font-light text-gray-600 mb-8 leading-relaxed">
                                Our collaborative AI agents work together seamlessly to handle every aspect of asset tokenization,
                                from initial valuation and legal documentation to regulatory compliance and blockchain deployment.
                            </p>

                            <div className="mb-8">
                                <h3 className="text-lg font-light mb-4 text-gray-800">MCP Multi-Agent Workflow</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">1</div>
                                        <span className="font-light text-gray-700">Legal Agent collects property data & ensures compliance</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">2</div>
                                        <span className="font-light text-gray-700">Valuation Agent performs automated asset appraisal</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">3</div>
                                        <span className="font-light text-gray-700">Tokenization Agent creates smart contracts & deploys tokens</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">4</div>
                                        <span className="font-light text-gray-700">Marketing Agent launches investment campaign</span>
                                    </div>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-black rounded-full"></div>
                                    <span className="font-light text-gray-700">Complete tokenization in 15-30 minutes</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-black rounded-full"></div>
                                    <span className="font-light text-gray-700">Automated regulatory compliance checking</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-black rounded-full"></div>
                                    <span className="font-light text-gray-700">Real-time collaboration between AI agents</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-black rounded-full"></div>
                                    <span className="font-light text-gray-700">Instant smart contract generation & deployment</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-black rounded-full"></div>
                                    <span className="font-light text-gray-700">Integrated investor onboarding & KYC workflows</span>
                                </li>
                            </ul>

                            <button className="bg-black text-white px-8 py-3 text-sm font-light hover:bg-gray-800 transition-colors">
                                Download Desktop App
                            </button>
                        </div>
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 text-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='0.5'/></svg>')", backgroundSize: '20px 20px' }}></div>

                            <div className="relative z-10">
                                <Brain size={80} className="mx-auto mb-6 text-white" />
                                <h3 className="text-xl font-light text-white mb-4">MCP-Based Platform</h3>
                                <p className="text-gray-300 font-light mb-6 leading-relaxed">
                                    Model Context Protocol enables seamless collaboration between specialized AI agents,
                                    creating an efficient tokenization pipeline.
                                </p>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="bg-white/10 rounded p-3">
                                        <div className="text-white font-medium mb-1">⚡ Speed</div>
                                        <div className="text-gray-300 font-light">Minutes not months</div>
                                    </div>
                                    <div className="bg-white/10 rounded p-3">
                                        <div className="text-white font-medium mb-1">🤖 AI Agents</div>
                                        <div className="text-gray-300 font-light">Multi-agent collaboration</div>
                                    </div>
                                    <div className="bg-white/10 rounded p-3">
                                        <div className="text-white font-medium mb-1">🔗 MCP</div>
                                        <div className="text-gray-300 font-light">Seamless integration</div>
                                    </div>
                                    <div className="bg-white/10 rounded p-3">
                                        <div className="text-white font-medium mb-1">📊 Analytics</div>
                                        <div className="text-gray-300 font-light">Real-time insights</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Active Projects */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-16">
                        <div>
                            <h2 className="text-4xl font-extralight mb-4 tracking-tight">Active RWA Projects</h2>
                            <p className="text-lg font-light text-gray-600">
                                Discover premium real estate investment opportunities
                            </p>
                        </div>
                        <Link href="/projects" className="text-sm font-light hover:text-gray-600 transition-colors border-b border-gray-300">
                            View All Projects →
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {mockProjects.slice(0, 3).map((project) => (
                            <Link key={project.id} href={`/project/${project.id}`} className="block">
                                <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 transition-colors">
                                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-6xl">
                                        {project.image}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-light mb-2">{project.name}</h3>
                                        <p className="text-sm text-gray-600 font-light mb-4">{project.type}</p>

                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <div className="text-lg font-light">{project.value}</div>
                                                <div className="text-xs text-gray-500 uppercase tracking-wide">Property Value</div>
                                            </div>
                                            <div>
                                                <div className="text-lg font-light">{project.yield}</div>
                                                <div className="text-xs text-gray-500 uppercase tracking-wide">Annual Yield</div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                            <div className="text-sm text-gray-600 font-light">
                                                {project.tokensSold} / {project.totalTokens} tokens sold
                                            </div>
                                            <div className="text-sm font-light">
                                                {Math.round((parseFloat(project.tokensSold.replace('K', '')) / parseFloat(project.totalTokens.replace('M', '')) * 1000) * 100)}% sold
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="text-xl font-light mb-4">ASSETA</div>
                            <p className="text-sm text-gray-600 font-light">
                                Revolutionizing real estate investment through blockchain tokenization
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
                            © 2025 ASSETA. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default LandingContainer