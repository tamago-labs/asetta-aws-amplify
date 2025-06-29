
import { Building2, Users, TrendingUp, Shield, Zap, Brain, FileCheck, Bot } from 'lucide-react';
import { mockProjects } from "../../data/mockData"
import Link from 'next/link';
import Hero from './Hero';
import Features from "./Features"
import AIAgents from './AIAgents';
import Desktop from './Desktop';
import ActiveProjects from './ActiveProjects';
import Technologies from './Technologies';
import Problem from './Problem';
import HowItWorks from './HowItWorks';
import CTA from './CTA';

const LandingContainer = () => {
    return (
        <div >
            {/* Hero Section */}
            <Hero />

            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <h3 className="text-3xl font-light mb-2">10 mins</h3>
                            <p className="text-gray-600 text-sm">Average Deploy Time</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-light mb-2">4+</h3>
                            <p className="text-gray-600 text-sm">AI Agents Working</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-light mb-2">100+</h3>
                            <p className="text-gray-600 text-sm">MCP Tools Connected</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-light mb-2">AWS Bedrock</h3>
                            <p className="text-gray-600 text-sm">Powered By</p>
                        </div>
                    </div>
                </div>
            </section> 

            {/* Active Projects */}
            <ActiveProjects />

            {/* Problem Section */}
            <Problem />

            {/* How It Works Projects */}
            {/* <HowItWorks /> */}

            {/* Features Section */}
            {/* <Features /> */}

            {/* Technologies Section */}
            <Technologies />

            {/* Desktop Application Mode */}
            <Desktop />

            {/* AI Agents Section */}
            <AIAgents />

            <CTA />

        </div>
    )
}

export default LandingContainer