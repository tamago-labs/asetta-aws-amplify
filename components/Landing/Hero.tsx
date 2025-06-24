
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="py-14 md:py-20 px-4 md:px-6">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-extralight mb-6 tracking-tight">
                    Multi-Agent Collaborative<br />
                    <span className="text-gray-600">For Real-World Asset Projects</span>
                </h1>
                <p className="text-base md:text-xl font-light text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
                    AWS-powered multi-agent platform deploying complete RWA projects in minutes across multiple chains using specialized AI agents and Chainlink CCIP
                </p>
                <div className="flex justify-center gap-4">
                    <Link href="/projects" className="bg-black text-white px-8 py-4 text-sm font-light hover:bg-gray-800 transition-colors">
                        Explore Projects
                    </Link>
                    <Link href="https://github.com/tamago-labs/asseta" target='_blank'>
                        <button className="border border-gray-300 cursor-pointer text-black px-8 py-4 text-sm font-light hover:bg-gray-50 transition-colors">
                            Learn More
                        </button>
                    </Link> 
                </div>
            </div>
        </section>
    )
}

export default Hero