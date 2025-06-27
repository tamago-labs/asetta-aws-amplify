"use client"

import { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, Shield, Download, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import { getCurrentUser } from 'aws-amplify/auth';
import {
    formatValue,
    getCategoryIcon,
    parseAssetMetadata
} from '@/utils/formatters';
import Breadcrumb from '../Breadcrumb';
import Link from 'next/link';
import AIConversation from './AIConversation';


const client = generateClient<Schema>();

interface IProjectDetails {
    id: string
}

interface Message {
    id: string;
    type: 'ai' | 'user';
    content: string;
    timestamp: Date;
}

const ProjectDetailContainer = ({ id }: IProjectDetails) => {
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [isLoggedIn, setLoggedIn] = useState(false)

    console.log("isLoggedIn:", isLoggedIn)

    useEffect(() => {
        const fetchProject = async () => {
            try {
                let isLoggedIn = false;
                try {
                    const { username } = await getCurrentUser();
                    isLoggedIn = username !== undefined;
                } catch (e) { }

                const { data: projectData } = await client.models.Project.get(
                    { id },
                    { authMode: isLoggedIn ? 'userPool' : "iam" }
                );

                if (isLoggedIn) {
                    setLoggedIn(true)
                }

                if (projectData) {
                    setProject(projectData);
                } else {
                    setError('Project not found');
                }
            } catch (err) {
                console.error('Error fetching project:', err);
                setError('Failed to load project');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProject();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading project details...</p>
                </div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error || 'Project not found'}</p>
                    <button
                        onClick={() => window.history.back()}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const assetMetadata = parseAssetMetadata(project.assetMetadata);

    return (
        <div className="h-screen grid grid-cols-2">
            {/* Left Side - Project Details */}
            <div className="flex-1 bg-gray-50 overflow-y-auto">
                {/* Hero Section */}
                <div className="p-8 border-b border-gray-200">
                    <Breadcrumb items={[
                        { label: 'Home', href: '/' },
                        { label: 'RWA Projects', href: '/projects' },
                        { label: project.name }
                    ]} />
                    <div className="w-full h-64 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mb-6 flex items-center justify-center text-white text-8xl relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><rect width=\"100\" height=\"100\" fill=\"none\" stroke=\"rgba(255,255,255,0.1)\" stroke-width=\"0.5\"/></svg>')", backgroundSize: '20px 20px' }}></div>
                        {project.previewImage || getCategoryIcon(project.category)}
                    </div>

                    <h1 className="text-4xl font-extralight text-gray-800 mb-2 tracking-tight">{project.name}</h1>
                    <p className="text-lg text-gray-600 font-light mb-4">{project.type}</p>

                    <div className="flex items-center gap-6 text-sm text-gray-500 font-light">
                        <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{project.location}</span>
                        </div>
                        {project.yearBuilt && (
                            <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                <span>Built {project.yearBuilt}</span>
                            </div>
                        )}
                        {project.squareFootage && (
                            <div className="flex items-center gap-1">
                                <Users size={14} />
                                <span>{project.squareFootage}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                    <div className="px-8">
                        <nav className="flex space-x-8">
                            {['overview', 'financials', 'token-info', 'kyc', 'documents'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-4 text-sm font-light capitalize border-b-2 transition-colors ${activeTab === tab
                                        ? 'border-black text-black'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {tab.replace('-', ' ')}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="p-8">
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-lg border border-gray-200">
                                    <h3 className="text-2xl font-light mb-1">{formatValue(project.value)}</h3>
                                    <p className="text-sm text-gray-500 uppercase tracking-wide">Total Value</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg border border-gray-200">
                                    <h3 className="text-2xl font-light text-green-600 mb-1">{project.yieldRate || 'N/A'}</h3>
                                    <p className="text-sm text-gray-500 uppercase tracking-wide">Annual Yield</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg border border-gray-200">
                                    <h3 className="text-2xl font-light mb-1">{project.occupancy || 'N/A'}</h3>
                                    <p className="text-sm text-gray-500 uppercase tracking-wide">Occupancy</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-light mb-4">Asset Details</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Category:</span>
                                        <span className="ml-2 font-light">{project.category?.replace('_', ' ') || 'N/A'}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Status:</span>
                                        <span className="ml-2 font-light">{project.status}</span>
                                    </div>
                                    {project.yearBuilt && (
                                        <div>
                                            <span className="text-gray-500">Year Built:</span>
                                            <span className="ml-2 font-light">{project.yearBuilt}</span>
                                        </div>
                                    )}
                                    {project.squareFootage && (
                                        <div>
                                            <span className="text-gray-500">Size:</span>
                                            <span className="ml-2 font-light">{project.squareFootage}</span>
                                        </div>
                                    )}
                                    {assetMetadata.monthlyRentalIncome && (
                                        <div>
                                            <span className="text-gray-500">Monthly Income:</span>
                                            <span className="ml-2 font-light">${assetMetadata.monthlyRentalIncome}</span>
                                        </div>
                                    )}
                                    {assetMetadata.keyTenants && (
                                        <div className="col-span-2">
                                            <span className="text-gray-500">Key Tenants:</span>
                                            <span className="ml-2 font-light">{assetMetadata.keyTenants}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'financials' && (
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-light mb-4">Financial Overview</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <div className="text-2xl font-light mb-1">{formatValue(project.value)}</div>
                                        <div className="text-sm text-gray-500">Asset Value</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-light text-green-600 mb-1">{project.yieldRate || 'N/A'}</div>
                                        <div className="text-sm text-gray-500">Expected Yield</div>
                                    </div>
                                    {assetMetadata.monthlyRentalIncome && (
                                        <div>
                                            <div className="text-2xl font-light mb-1">${assetMetadata.monthlyRentalIncome}</div>
                                            <div className="text-sm text-gray-500">Monthly Income</div>
                                        </div>
                                    )}
                                    <div>
                                        <div className="text-2xl font-light mb-1">${project.minimumInvestment || '1,000'}</div>
                                        <div className="text-sm text-gray-500">Min. Investment</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'token-info' && (
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-light mb-4">Token Information</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <div className="text-2xl font-light mb-1">${project.tokenPrice}</div>
                                        <div className="text-sm text-gray-500">Price per Token</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-light mb-1">{project.totalTokens || 'N/A'}</div>
                                        <div className="text-sm text-gray-500">Total Supply</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-light mb-1">{project.tokensSold || '0'}</div>
                                        <div className="text-sm text-gray-500">Tokens Sold</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-light mb-1">{project.network || 'N/A'}</div>
                                        <div className="text-sm text-gray-500">Network</div>
                                    </div>
                                </div>
                                {project.tokenAddress && (
                                    <div className="mt-4 p-3 bg-gray-50 rounded">
                                        <div className="text-sm text-gray-500 mb-1">Token Contract Address:</div>
                                        <div className="font-mono text-xs break-all">{project.tokenAddress}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'kyc' && (
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-light mb-4">KYC Requirements</h3>
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-gray-500">Required Level:</span>
                                        <span className="ml-2 font-light">{project.requiredKycLevel || 'BASIC'}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Jurisdiction:</span>
                                        <span className="ml-2 font-light">{project.jurisdiction || 'Global'}</span>
                                    </div>
                                    {project.regulatoryFramework && (
                                        <div>
                                            <span className="text-gray-500">Framework:</span>
                                            <span className="ml-2 font-light">{project.regulatoryFramework}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'documents' && (
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-light mb-4">Project Documents</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <FileText size={16} className="text-gray-400" />
                                            <div>
                                                <div className="font-light">Project Prospectus</div>
                                                <div className="text-xs text-gray-500">PDF</div>
                                            </div>
                                        </div>
                                        <button className="text-sm text-blue-600 hover:text-blue-800">
                                            <Download size={14} className="inline mr-1" />
                                            Download
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <FileText size={16} className="text-gray-400" />
                                            <div>
                                                <div className="font-light">Financial Statements</div>
                                                <div className="text-xs text-gray-500">PDF</div>
                                            </div>
                                        </div>
                                        <button className="text-sm text-blue-600 hover:text-blue-800">
                                            <Download size={14} className="inline mr-1" />
                                            Download
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between py-3">
                                        <div className="flex items-center gap-3">
                                            <FileText size={16} className="text-gray-400" />
                                            <div>
                                                <div className="font-light">Token Terms</div>
                                                <div className="text-xs text-gray-500">PDF</div>
                                            </div>
                                        </div>
                                        <button className="text-sm text-blue-600 hover:text-blue-800">
                                            <Download size={14} className="inline mr-1" />
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side - AI Chat Assistant */}
            <div className="flex-1 bg-white flex flex-col border-l border-gray-200">

                {!isLoggedIn ? (
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                        <p className="text-gray-600 text-sm mb-4">Please log in to use the AI assistant features.</p>

                        <Link href="/dashboard" >
                            <button className="bg-black cursor-pointer  text-white px-6 py-2 text-sm font-light hover:bg-gray-800 transition-colors">
                                Go to Login
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex-1 p-6">
                        <div className="bg-white p-6 border-b border-gray-200">
                            <div className="text-xl font-light text-gray-800 mb-2 tracking-tight">AI Investment Assistant</div>
                            <div className="text-sm text-gray-500 font-light">KYC verification, investment guidance & purchase support</div>

                            <div className="flex items-center gap-3 mt-4 p-3 bg-gray-50 rounded border border-gray-200">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <div className="text-xs text-gray-500 font-light">AI assistant active</div>
                            </div>
                        </div>

                        <AIConversation/>

                    </div>
                )}

            </div>
        </div>
    )
}

export default ProjectDetailContainer