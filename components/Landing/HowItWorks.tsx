

const HowItWorks = () => {
    return (
        <section className="py-20 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-light text-center mb-16">Deploy in Minutes</h2>
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="text-center">
                        <div className="text-3xl font-light text-gray-400 mb-4">01</div>
                        <h3 className="text-xl font-light mb-4">Upload & Configure</h3>
                        <p className="text-gray-600">Upload project documents through our Rust-based desktop application. AI agents automatically process and structure your RWA project data.</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-light text-gray-400 mb-4">02</div>
                        <h3 className="text-xl font-light mb-4">AI Processing</h3>
                        <p className="text-gray-600">Legal agents handle compliance, KYC agents verify investors, and tokenization agents prepare smart contracts across multiple chains.</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-light text-gray-400 mb-4">03</div>
                        <h3 className="text-xl font-light mb-4">Multi-Chain Deploy</h3>
                        <p className="text-gray-600">Chainlink CCIP enables seamless deployment across multiple blockchains. Your RWA project is investment-ready in minutes.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks