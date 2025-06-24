
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-6xl font-extralight mb-6 tracking-tight">
                    Real World Assets,<br />
                    <span className="text-gray-600">Tokenized.</span>
                </h1>
                <p className="text-xl font-light text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                    Revolutionary platform enabling fractional ownership of premium real estate through blockchain technology.
                    Multiple AI agents streamline the tokenization process for project owners.
                </p>
                <div className="flex justify-center gap-4">
                    <Link href="/projects" className="bg-black text-white px-8 py-4 text-sm font-light hover:bg-gray-800 transition-colors">
                        Explore Projects
                    </Link>
                    <button className="border border-gray-300 text-black px-8 py-4 text-sm font-light hover:bg-gray-50 transition-colors">
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Hero