"use client"


import React, { useState } from 'react';
import Link from 'next/link';
import { mockProjects } from "../../data/mockData"
import { Search, Filter, TrendingUp, MapPin } from 'lucide-react';
import PageHeader from './PageHeader';

const ProjectsContainer = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('yield');

    const categories = ['All', 'Commercial', 'Residential', 'Mixed-Use', 'Industrial', 'Retail'];

    const filteredProjects = mockProjects
        .filter(project => {
            const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.location.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'yield':
                    return parseFloat(b.yield) - parseFloat(a.yield);
                case 'value':
                    return parseFloat(b.value.replace(/[$M]/g, '')) - parseFloat(a.value.replace(/[$M]/g, ''));
                case 'name':
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });

    return (
        <div>
            <PageHeader
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                categories={categories}
                sortBy={sortBy}
                setSortBy={setSortBy}
                setSelectedCategory={setSelectedCategory}
            />

            {/* Projects Grid */}
            <section className="px-6 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <Link key={project.id} href={`/project/${project.id}`} className="block">
                                <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-black transition-colors group">
                                    <div className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-7xl relative overflow-hidden">
                                        {project.image}
                                        <div className="absolute top-4 right-4">
                                            <span className={`px-3 py-1 text-xs font-light rounded-full ${project.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {project.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-xl font-light group-hover:text-gray-600 transition-colors">{project.name}</h3>
                                            <TrendingUp size={16} className="text-gray-400 mt-1" />
                                        </div>

                                        <p className="text-sm text-gray-600 font-light mb-1">{project.type}</p>
                                        <div className="flex items-center gap-1 text-sm text-gray-500 font-light mb-4">
                                            <MapPin size={14} />
                                            <span>{project.location}</span>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 mb-4">
                                            <div>
                                                <div className="text-lg font-light">{project.value}</div>
                                                <div className="text-xs text-gray-500 uppercase tracking-wide">Value</div>
                                            </div>
                                            <div>
                                                <div className="text-lg font-light text-green-600">{project.yield}</div>
                                                <div className="text-xs text-gray-500 uppercase tracking-wide">Yield</div>
                                            </div>
                                            <div>
                                                <div className="text-lg font-light">{project.occupancy}</div>
                                                <div className="text-xs text-gray-500 uppercase tracking-wide">Occupied</div>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="flex justify-between text-sm font-light mb-1">
                                                <span>{project.tokensSold} / {project.totalTokens} tokens</span>
                                                <span>{Math.round((parseFloat(project.tokensSold.replace('K', '').replace('M', '')) / parseFloat(project.totalTokens.replace('K', '').replace('M', ''))) * 100)}% sold</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-black h-2 rounded-full transition-all"
                                                    style={{ width: `${Math.round((parseFloat(project.tokensSold.replace('K', '').replace('M', '')) / parseFloat(project.totalTokens.replace('K', '').replace('M', ''))) * 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                            <div className="text-sm text-gray-600 font-light">
                                                Token Price: {project.tokenPrice}
                                            </div>
                                            <div className="text-sm font-light group-hover:text-black transition-colors">
                                                View Details →
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-gray-400 mb-4">
                                <Filter size={48} className="mx-auto" />
                            </div>
                            <h3 className="text-xl font-light mb-2">No projects found</h3>
                            <p className="text-gray-600 font-light">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </div>
            </section>


        </div>
    )
}

export default ProjectsContainer