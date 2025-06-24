import { Search, Filter, TrendingUp, MapPin } from 'lucide-react';
import Breadcrumb from '../Breadcrumb';
import { mockProjects } from "../../data/mockData"

const PageHeader = ({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    categories,
    sortBy,
    setSortBy,
    setSelectedCategory
}: any) => {



    return (
        <section className="py-16 pt-8  px-6">
            <div className="max-w-7xl mx-auto">
                <Breadcrumb items={[
                    { label: 'Home', href: '/' },
                    { label: 'RWA Projects' }
                ]} />

                <h1 className="text-5xl font-extralight mb-4 tracking-tight">RWA Projects</h1>
                <p className="text-xl font-light text-gray-600 mb-8 max-w-2xl">
                    Discover and invest in tokenized real estate assets with transparent yields and verified performance.
                </p>

                {/* Search and Filters */}
                {/*<div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search projects by name or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg font-light text-sm focus:outline-none focus:border-black transition-colors"
                        />
                    </div>

                    <div className="flex gap-4">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg font-light text-sm focus:outline-none focus:border-black transition-colors"
                        >
                            {categories.map((category: any) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg font-light text-sm focus:outline-none focus:border-black transition-colors"
                        >
                            <option value="yield">Sort by Yield</option>
                            <option value="value">Sort by Value</option>
                            <option value="name">Sort by Name</option>
                        </select>
                    </div>
                </div>*/}

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <div className="text-3xl font-extralight mb-2">{mockProjects.length}</div>
                        <div className="text-sm text-gray-600 font-light">Active Projects</div>
                    </div>
                    <div>
                        <div className="text-3xl font-extralight mb-2">$160.7M</div>
                        <div className="text-sm text-gray-600 font-light">Total Asset Value</div>
                    </div>
                    <div>
                        <div className="text-3xl font-extralight mb-2">7.6%</div>
                        <div className="text-sm text-gray-600 font-light">Average Yield</div>
                    </div>
                    <div>
                        <div className="text-3xl font-extralight mb-2">94%</div>
                        <div className="text-sm text-gray-600 font-light">Avg. Occupancy</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PageHeader