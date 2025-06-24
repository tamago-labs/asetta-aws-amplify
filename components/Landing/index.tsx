 
import { Building2, Users, TrendingUp, Shield, Zap, Brain, FileCheck, Bot } from 'lucide-react';
import { mockProjects } from "../../data/mockData"
import Link from 'next/link'; 
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

            {/* Active Projects */}
            <ActiveProjects/>

            {/* AI Agents Section */}
            {/*<AIAgents/>*/}

            {/* Desktop Application Mode */}
            <Desktop/>

           
 
        </div>
    )
}

export default LandingContainer