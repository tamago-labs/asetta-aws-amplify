import { Building2, Users, TrendingUp, Shield, Zap, Brain, FileCheck, Bot } from 'lucide-react';


const Desktop = () => {
    return (
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
    )
}

export default Desktop