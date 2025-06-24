

const Technologies = () => {
    return (
        <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-light mb-6">Built on Enterprise Infrastructure</h2>
                <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">Powered by industry-leading technologies for security, scalability, and reliability</p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    <div className="p-6 border border-gray-200">
                        <h3 className="font-light mb-2">AI MCP</h3>
                        <p className="text-sm text-gray-600">Model Context Protocol for agent collaboration</p>
                    </div>
                    <div className="p-6 border border-gray-200">
                        <h3 className="font-light mb-2">AWS Infrastructure</h3>
                        <p className="text-sm text-gray-600">Enterprise-grade cloud computing</p>
                    </div>
                    <div className="p-6 border border-gray-200">
                        <h3 className="font-light mb-2">Chainlink CCIP</h3>
                        <p className="text-sm text-gray-600">Cross-chain interoperability protocol</p>
                    </div>
                    <div className="p-6 border border-gray-200">
                        <h3 className="font-light mb-2">Rust Desktop</h3>
                        <p className="text-sm text-gray-600">High-performance desktop application</p>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Technologies