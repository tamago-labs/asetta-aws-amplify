import { Search, Filter, TrendingUp, MapPin } from 'lucide-react';
import Breadcrumb from '../Breadcrumb';
import { mockProjects } from "../../data/mockData"

interface PageHeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    categories: string[];
    sortBy: string;
    setSortBy: (sort: string) => void;
    selectedStatus: string;
    setSelectedStatus: (status: string) => void;
    statuses: string[];
}

const categoryDisplayNames: { [key: string]: string } = {
    'Commercial': 'Commercial',
    'Residential': 'Residential',
    'Mixed-Use': 'Mixed-Use',
    'Industrial': 'Industrial',
    'Retail': 'Retail'
};

const statusDisplayNames: { [key: string]: string } = {
    'Active': 'Active',
    'Launching Soon': 'Launching Soon',
    'Completed': 'Completed'
};

const PageHeader = ({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    categories,
    sortBy,
    setSortBy,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    statuses
}: PageHeaderProps) => {

    // Calculate stats from mock data
    const totalValue = mockProjects.reduce((sum, project) => {
        return sum + parseFloat(project.value.replace(/[$M]/g, ''));
    }, 0);

    const averageYield = mockProjects.reduce((sum, project) => {
        const yield_ = parseFloat(project.yieldRate?.replace('%', '') || '0');
        return sum + yield_;
    }, 0) / mockProjects.length;

    const averageOccupancy = mockProjects
        .filter(p => p.occupancy)
        .reduce((sum, project) => {
            return sum + parseFloat(project.occupancy?.replace('%', '') || '0');
        }, 0) / mockProjects.filter(p => p.occupancy).length;

    const activeProjectsCount = mockProjects.filter(p => p.status === 'Active').length;

    return (
        <section className="py-16 pt-8 px-6 pb-8">
            <div className="max-w-7xl mx-auto">
                <Breadcrumb items={[
                    { label: 'Home', href: '/' },
                    { label: 'RWA Projects' }
                ]} />

                <h1 className="text-5xl font-extralight mb-4 tracking-tight">RWA Projects</h1>
                <p className="text-xl font-light text-gray-600 mb-8 max-w-2xl">
                Explore and invest in tokenized real-world assets published by Asetta RWA Studio with AI agents expert in each field
                </p>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search projects by name, location, or type..."
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
                            <option value="All">All Categories</option>
                            {categories.filter(cat => cat !== 'All').map((category: string) => (
                                <option key={category} value={category}>
                                    {categoryDisplayNames[category] || category}
                                </option>
                            ))}
                        </select>

                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg font-light text-sm focus:outline-none focus:border-black transition-colors"
                        >
                            <option value="All">All Status</option>
                            {statuses.filter(status => status !== 'All').map((status: string) => (
                                <option key={status} value={status}>
                                    {statusDisplayNames[status] || status}
                                </option>
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
                            <option value="tokens_sold">Sort by Tokens Sold</option>
                        </select>
                    </div>
                </div>
 
            </div>
        </section>
    )
}

export default PageHeader