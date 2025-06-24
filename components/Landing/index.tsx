
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

            {/* Problem Section */}
            <Problem />

            {/* Active Projects */}
            <ActiveProjects />

            {/* How It Works Projects */}
            <HowItWorks />

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