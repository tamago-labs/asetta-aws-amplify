

const Technologies = () => {
    return (
        <section className="py-20 px-6">
           <div className="max-w-6xl mx-auto text-center">
  <h2 className="text-4xl font-light mb-6">Next-Gen Infrastructure for RWA Tokenization</h2>
  <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
  Combining AI, cloud, and blockchain to power compliant, cross-chain tokenization with speed, automation and auditability
  </p>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
    <div className="p-6 border border-gray-200">
      <h3 className="font-light mb-2">AI MCP</h3>
      <p className="text-sm text-gray-600">
        Model Context Protocol enabling multi-agent collaboration
      </p>
    </div>
    <div className="p-6 border border-gray-200">
      <h3 className="font-light mb-2">AWS Infrastructure</h3>
      <p className="text-sm text-gray-600">
        Built on AWS Amplify and Bedrock using Claude models for RWA workflows
      </p>
    </div>
    <div className="p-6 border border-gray-200">
      <h3 className="font-light mb-2">Chainlink CCIP</h3>
      <p className="text-sm text-gray-600">
      All RWA tokens created with AI assistance are compliant with Chainlink’s CCT Standard
      </p>
    </div>
    <div className="p-6 border border-gray-200">
      <h3 className="font-light mb-2">RWA Studio</h3>
      <p className="text-sm text-gray-600">
        A Rust + Tauri desktop application designed for multi-agent RWA workflows
      </p>
    </div>
  </div>
</div>

        </section>

    )
}

export default Technologies