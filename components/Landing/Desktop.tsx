import { Building2, Users, TrendingUp, Shield, Zap, Brain, FileCheck, Bot } from 'lucide-react';
import Link from "next/link"

const Desktop = () => {
    return (
        <section className="py-20 px-6 bg-gray-50" id="download">
  <div className="max-w-7xl mx-auto">
    <div className="grid md:grid-cols-2 gap-16 items-center">
      
      {/* Left: Content */}
      <div>
        <h2 className="text-4xl font-light mb-6 tracking-tight">Asetta RWA Studio</h2>
        <p className="text-lg font-light text-gray-600 mb-6 leading-relaxed">
          Asetta RWA Studio is a powerful desktop app for real-world asset (RWA) tokenization. 
          It leverages a Multi-Agent Model Context Protocol (MCP) to streamline the entire proces across multiple blockchains.
        </p>

        <ul className="space-y-4 mb-8">
          {[
            "Complete tokenization in 15–30 minutes",
            "Automated regulatory compliance checking",
            "Real-time collaboration between AI agents",
            "Instant smart contract generation & deployment"
          ].map((text, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <div className="w-2 h-2 bg-black rounded-full" />
              <span className="font-light text-gray-700">{text}</span>
            </li>
          ))}
        </ul>

        <Link href="https://github.com/tamago-labs/asetta" target="_blank">
          <button className="bg-black text-white px-8 py-3 text-sm font-light hover:bg-gray-800 transition-colors">
            Download Now
          </button>
        </Link>
      </div>

      {/* Right: Screenshot */}
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        <img
          src="/screenshot-1.png"
          alt="Asetta Screenshot"
          className="w-full rounded-lg border border-gray-200"
        />
      </div>
    </div>
  </div>
</section>

    )
}

export default Desktop