 
const AIAgents = () => {
    return (
        <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-light text-center mb-16">Specialized AI Agents</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-black rounded-full mx-auto mb-4"></div>
                        <h3 className="text-xl font-light mb-3">Tokenization Agent</h3>
                        <p className="text-gray-600 text-sm">Smart contract operations across multiple blockchains via Chainlink CCIP</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-black rounded-full mx-auto mb-4"></div>
                        <h3 className="text-xl font-light mb-3">AWS Expert Agent</h3>
                        <p className="text-gray-600 text-sm">Document processing and AI assistant setup on AWS infrastructure</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-black rounded-full mx-auto mb-4"></div>
                        <h3 className="text-xl font-light mb-3">Legal Agent</h3>
                        <p className="text-gray-600 text-sm">Automated compliance management and regulatory requirements</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-black rounded-full mx-auto mb-4"></div>
                        <h3 className="text-xl font-light mb-3">KYC Agent</h3>
                        <p className="text-gray-600 text-sm">Investor verification and automated whitelisting processes</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AIAgents