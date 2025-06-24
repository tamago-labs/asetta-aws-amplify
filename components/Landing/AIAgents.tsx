
import { Building2, Users, TrendingUp, Shield, Zap, Brain, FileCheck, Bot } from 'lucide-react';

const AIAgents = () => {
    return (
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
    )
}

export default AIAgents