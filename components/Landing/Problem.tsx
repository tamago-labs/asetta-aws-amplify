const Problem = () => {
    return (
        <section className="py-20 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-light mb-6">The Challenge</h2>
                        <p className="text-gray-600 mb-6">RWA tokenization traditionally takes months of complex legal work, manual KYC processes, and technical blockchain deployment challenges.</p>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-start">
                                <span className="text-red-500 mr-3 mt-1">✕</span>
                                <span>Months of legal compliance setup</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-500 mr-3 mt-1">✕</span>
                                <span>Manual KYC verification bottlenecks</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-500 mr-3 mt-1">✕</span>
                                <span>Complex technical deployment</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-500 mr-3 mt-1">✕</span>
                                <span>High barriers to entry</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-3xl font-light mb-6">Our Solution</h2>
                        <p className="text-gray-600 mb-6">Revolutionizing real-world asset tokenization through multi-agent AI automation where each agent specializes in their field powered by AWS serverless infrastructure.</p>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-3 mt-1">✓</span>
                                <span>AWS Bedrock + Claude Sonnet 4 AI model</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-3 mt-1">✓</span>
                                <span>MCP-based desktop app simplifying RWA tokenization</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-3 mt-1">✓</span>
                                <span>Chainlink for seamless API-to-smart contract sync</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-3 mt-1">✓</span>
                                <span>KYC verification through AI chat assistant</span>
                            </li>
                        </ul>


                    </div>
                </div>
            </div>
        </section>
    )
}

export default Problem