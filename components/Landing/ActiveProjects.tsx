import Link from 'next/link';
import { mockProjects } from "../../data/mockData"

const ActiveProjects = () => {
    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-16">
                    <div>
                        <h2 className="text-4xl font-extralight mb-4 tracking-tight">Active RWA Projects</h2>
                        <p className="text-lg font-light text-gray-600">
                            Discover premium real estate investment opportunities
                        </p>
                    </div>
                    <Link href="/projects" className="text-sm font-light hover:text-gray-600 transition-colors border-b border-gray-300">
                        View All Projects →
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {mockProjects.slice(0, 3).map((project) => (
                        <Link key={project.id} href={`/project/${project.id}`} className="block">
                            <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 transition-colors">
                                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-6xl">
                                    {project.image}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-light mb-2">{project.name}</h3>
                                    <p className="text-sm text-gray-600 font-light mb-4">{project.type}</p>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <div className="text-lg font-light">{project.value}</div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wide">Property Value</div>
                                        </div>
                                        <div>
                                            <div className="text-lg font-light">{project.yield}</div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wide">Annual Yield</div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                        <div className="text-sm text-gray-600 font-light">
                                            {project.tokensSold} / {project.totalTokens} tokens sold
                                        </div>
                                        <div className="text-sm font-light">
                                            {Math.round((parseFloat(project.tokensSold.replace('K', '')) / parseFloat(project.totalTokens.replace('M', '')) * 1000) * 100)}% sold
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ActiveProjects