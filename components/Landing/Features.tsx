import { Building2, Users, TrendingUp, Shield, Zap, Brain, FileCheck, Bot } from 'lucide-react';

const Features = () => {
    return (
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
    )
}

export default Features