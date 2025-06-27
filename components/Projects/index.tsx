"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, TrendingUp, MapPin, Calendar, Building, Loader2 } from 'lucide-react';
import PageHeader from './PageHeader';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource'; 
import { getCurrentUser } from 'aws-amplify/auth';
import { 
    formatValue, 
    formatTokenCount, 
    calculateTokensSoldPercentage, 
    getCategoryIcon, 
    getStatusColor, 
    getStatusLabel 
} from '@/utils/formatters';

// Configure the data client
const client = generateClient<Schema>();
 
const ProjectsContainer = () => {
     
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [sortBy, setSortBy] = useState('name');

    const categories = ['All', 'Commercial', 'Residential', 'Mixed-Use', 'Industrial', 'Retail', 'Treasury', 'Corporate Bond', 'Municipal Bond', 'Government Bond', 'Precious Metals', 'Energy', 'Agriculture', 'Industrial Metals'];
    const statuses = ['All', 'Prepare', 'Active', 'Launching Soon', 'Completed', 'Paused', 'Cancelled'];

    // Fetch projects from AWS Amplify
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                let isLoggedIn = false
                try {
                    const { username } = await getCurrentUser();
                    isLoggedIn = username !== undefined
                } catch (e) { 
                }

                const { data: projectsData, errors } = await client.models.Project.list({
                    authMode: isLoggedIn ? 'userPool'  : "iam"
                });

                console.log("projectsData : ", projectsData)
 
                if (errors) {
                    console.error('GraphQL errors:', errors);
                    setError('Failed to fetch projects');
                    return;
                }

                if (projectsData) { 
                    setProjects(projectsData);
                }
            } catch (err) {
                console.error('Error fetching projects:', err);
                setError('Failed to load projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const filteredProjects = projects
        .filter(project => {
            const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.type.toLowerCase().includes(searchTerm.toLowerCase());
            
            const categoryMatch = selectedCategory === 'All' || 
                (project.category && project.category.toLowerCase().replace('_', '-') === selectedCategory.toLowerCase().replace(' ', '-'));
            
            const statusMatch = selectedStatus === 'All' || 
                (project.status && project.status.toLowerCase().replace('_', ' ') === selectedStatus.toLowerCase());
            
            return matchesSearch && categoryMatch && statusMatch;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'yield':
                    const aYield = parseFloat(a.yieldRate?.replace('%', '') || '0');
                    const bYield = parseFloat(b.yieldRate?.replace('%', '') || '0');
                    return bYield - aYield;
                case 'value':
                    const aValue = parseFloat(a.value.replace(/[$M,]/g, ''));
                    const bValue = parseFloat(b.value.replace(/[$M,]/g, ''));
                    return bValue - aValue;
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'tokens_sold':
                    return parseInt(b.tokensSold || '0') - parseInt(a.tokensSold || '0');
                default:
                    return 0;
            }
        });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading projects...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

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
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                statuses={statuses}
            />

            {/* Projects Grid */}
            <section className="px-6 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => {
                            const tokensSoldPercentage = calculateTokensSoldPercentage(project.tokensSold, project.totalTokens);
                            
                            return (
                                <Link key={project.id} href={`/project/${project.id}`} className="block">
                                    <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-black transition-colors group">
                                        <div className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-7xl relative overflow-hidden">
                                            {project.previewImage || getCategoryIcon(project.category)}
                                            <div className="absolute top-4 right-4">
                                                <span className={`px-3 py-1 text-xs font-light rounded-full ${getStatusColor(project.status)}`}>
                                                    {getStatusLabel(project.status)}
                                                </span>
                                            </div>
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 text-xs font-light rounded-full bg-white/90 text-gray-700">
                                                    {project.category?.replace('_', ' ') || 'Commercial'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="text-xl font-light group-hover:text-gray-600 transition-colors">{project.name}</h3>
                                                <TrendingUp size={16} className="text-gray-400 mt-1" />
                                            </div>

                                            <p className="text-sm text-gray-600 font-light mb-1">{project.type}</p>
                                            <div className="flex items-center gap-1 text-sm text-gray-500 font-light mb-2">
                                                <MapPin size={14} />
                                                <span>{project.location}</span>
                                            </div>

                                            {/* Asset-specific details */}
                                            {project.yearBuilt && (
                                                <div className="flex items-center gap-1 text-sm text-gray-500 font-light mb-4">
                                                    <Calendar size={14} />
                                                    <span>Built {project.yearBuilt}</span>
                                                    {project.squareFootage && (
                                                        <>
                                                            <span className="mx-2">•</span>
                                                            <Building size={14} />
                                                            <span>{project.squareFootage}</span>
                                                        </>
                                                    )}
                                                </div>
                                            )}

                                            <div className="grid grid-cols-3 gap-4 mb-4">
                                                <div>
                                                    <div className="text-lg font-light">{formatValue(project.value)}</div>
                                                    <div className="text-xs text-gray-500 uppercase tracking-wide">Value</div>
                                                </div>
                                                <div>
                                                    <div className="text-lg font-light text-green-600">
                                                        {project.yieldRate || 'N/A'}
                                                    </div>
                                                    <div className="text-xs text-gray-500 uppercase tracking-wide">Yield</div>
                                                </div>
                                                <div>
                                                    <div className="text-lg font-light">
                                                        {project.occupancy || project.occupancyRate || 'N/A'}
                                                    </div>
                                                    <div className="text-xs text-gray-500 uppercase tracking-wide">Occupied</div>
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <div className="flex justify-between text-sm font-light mb-1">
                                                    <span>{formatTokenCount(project.tokensSold)} / {formatTokenCount(project.totalTokens)} tokens</span>
                                                    <span>{tokensSoldPercentage}% sold</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-black h-2 rounded-full transition-all"
                                                        style={{ width: `${tokensSoldPercentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                                <div className="text-sm text-gray-600 font-light">
                                                    Token Price: ${project.tokenPrice}
                                                </div>
                                                <div className="text-sm font-light group-hover:text-black transition-colors">
                                                    View Details →
                                                </div>
                                            </div>

                                            {/* Smart Contract Indicator */}
                                            {project.tokenAddress && (
                                                <div className="mt-2 text-xs text-green-600 font-light">
                                                    ✅ Tokenized on {project.network || 'Blockchain'}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {filteredProjects.length === 0 && !loading && (
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