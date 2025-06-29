
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="py-14 md:py-20 px-4 md:px-6">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-3xl md:text-6xl font-extralight mb-6 tracking-tight">
                    Multi-Agent Collaborative<br />
                    <span className="text-gray-600">For Real-World Asset Projects</span>
                </h1>
                <p className="text-sm md:text-xl font-light text-gray-600  mb-6 max-w-3xl mx-auto leading-relaxed">
                    AWS-powered multi-agent platform deploying complete RWA projects in minutes across multiple chains using specialized AI agents and Chainlink CCIP
                </p>
                <div className="mb-8">
                    <div className="inline-flex max-w-lg items-center px-4 py-2 border border-gray-300 rounded-md bg-white">
                        <span className="text-xs md:text-sm font-light text-gray-700">
                        💬 Chat to deploy RWA tokens on Avalanche, Ethereum and Arbitrum Testnets at once
                        </span>
                    </div>
                </div>
                <div className="flex justify-center gap-4">
                    <Link href="#download" className="bg-black text-white px-8 py-4 text-sm font-light hover:bg-gray-800 transition-colors">
                        Download RWA Studio
                    </Link>
                    <Link href="/projects" >
                        <button className="border border-gray-300 cursor-pointer text-black px-8 py-4 text-sm font-light hover:bg-gray-50 transition-colors">
                            Explore Projects
                        </button>
                    </Link>
                    {/* <Link href="/projects" className="bg-black text-white px-8 py-4 text-sm font-light hover:bg-gray-800 transition-colors">
                        Explore Projects
                    </Link> */}
                    {/* <Link href="https://github.com/tamago-labs/asetta" target='_blank'>
                        <button className="border border-gray-300 cursor-pointer text-black px-8 py-4 text-sm font-light hover:bg-gray-50 transition-colors">
                            Learn More
                        </button>
                    </Link> */}
                </div>
            </div>
        </section>
    )
}

export default Hero