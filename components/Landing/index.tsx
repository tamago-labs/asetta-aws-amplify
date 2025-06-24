 
import { Building2, Users, TrendingUp, Shield, Zap, Brain, FileCheck, Bot } from 'lucide-react';
import { mockProjects } from "../../data/mockData"
import Link from 'next/link';
import Footer from '../Footer';
import Hero from './Hero';
import Features from "./Features"
import AIAgents from './AIAgents';
import Desktop from './Desktop';
import ActiveProjects from './ActiveProjects';

const LandingContainer = () => {
    return (
        <div >
            {/* Hero Section */}
            <Hero/>

            {/* Features Section */}
           <Features/>

            {/* AI Agents Section */}
            <AIAgents/>

            {/* Desktop Application Mode */}
            <Desktop/>

            {/* Active Projects */}
            <ActiveProjects/>

            {/* Footer */}
            <Footer/>
        </div>
    )
}

export default LandingContainer