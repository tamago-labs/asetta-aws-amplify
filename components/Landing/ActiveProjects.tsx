"use client"

import Link from 'next/link';
import { useState, useEffect } from 'react';
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

const client = generateClient<Schema>();

const ActiveProjects = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                let isLoggedIn = false;
                try {
                    const { username } = await getCurrentUser();
                    isLoggedIn = username !== undefined;
                } catch (e) {}

                const { data: projectsData } = await client.models.Project.list({
                    authMode: isLoggedIn ? 'userPool' : "iam"
                });

                if (projectsData) {
                    setProjects(projectsData);
                }
            } catch (err) {
                console.error('Error fetching projects:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);
    
    const activeProjects = projects.filter(p => p.status === 'ACTIVE').slice(0, 3);
    
    if (loading) {
        return (
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading projects...</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-16">
                    <div>
                        <h2 className="text-4xl font-extralight mb-4 tracking-tight">Active RWA Projects</h2>
                        <p className="text-lg font-light text-gray-600">
                            Explore tokenized real-world assets from real estate to commodities and beyond
                        </p>
                    </div>
                    <Link href="/projects" className="text-sm font-light hover:text-gray-600 transition-colors border-b border-gray-300">
                        View All Projects →
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {activeProjects.map((project) => {
                        const tokensSoldPercentage = calculateTokensSoldPercentage(project.tokensSold, project.totalTokens);
                        
                        return (
                            <Link key={project.id} href={`/project/${project.id}`} className="block">
                                <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 transition-colors">
                                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-6xl relative">
                                        {project.previewImage || getCategoryIcon(project.category)}
                                        <div className="absolute top-4 right-4">
                                            <span className={`px-2 py-1 text-xs font-light rounded ${getStatusColor(project.status)}`}>
                                                {getStatusLabel(project.status)}
                                            </span>
                                        </div>
                                        <div className="absolute top-4 left-4">
                                            <span className="px-2 py-1 text-xs font-light rounded bg-white/90 text-gray-700">
                                                {project.category?.replace('_', ' ') || 'Commercial'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-light mb-2">{project.name}</h3>
                                        <p className="text-sm text-gray-600 font-light mb-1">{project.type}</p>
                                        <p className="text-sm text-gray-500 font-light mb-4">
                                            {project.location}
                                        </p>

                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <div className="text-lg font-light">{formatValue(project.value)}</div>
                                                <div className="text-xs text-gray-500 uppercase tracking-wide">Asset Value</div>
                                            </div>
                                            <div>
                                                <div className="text-lg font-light text-green-600">{project.yieldRate || 'N/A'}</div>
                                                <div className="text-xs text-gray-500 uppercase tracking-wide">Annual Yield</div>
                                            </div>
                                        </div>

                                        {/* Token Progress */}
                                        <div className="mb-4">
                                            <div className="flex justify-between text-sm font-light mb-2">
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
                                                From ${project.tokenPrice}/token
                                            </div>
                                            <div className="text-sm font-light">
                                                View Details →
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Asset Type Categories */}
                <div className="mt-16 pt-16 border-t border-gray-200">
                    <h3 className="text-2xl font-extralight mb-8 text-center">Asset Categories</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center p-6 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors">
                            <div className="text-3xl mb-3">🏢</div>
                            <h4 className="font-light mb-2">Real Estate</h4>
                            <p className="text-sm text-gray-600 font-light">Commercial, residential & mixed-use properties</p>
                        </div>
                        <div className="text-center p-6 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors">
                            <div className="text-3xl mb-3">🏛️</div>
                            <h4 className="font-light mb-2">Fixed Income</h4>
                            <p className="text-sm text-gray-600 font-light">Treasury bonds & corporate securities</p>
                        </div>
                        <div className="text-center p-6 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors">
                            <div className="text-3xl mb-3">🥇</div>
                            <h4 className="font-light mb-2">Commodities</h4>
                            <p className="text-sm text-gray-600 font-light">Precious metals & agricultural products</p>
                        </div>
                        <div className="text-center p-6 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors">
                            <div className="text-3xl mb-3">⚡</div>
                            <h4 className="font-light mb-2">Energy</h4>
                            <p className="text-sm text-gray-600 font-light">Renewable energy & infrastructure projects</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ActiveProjects