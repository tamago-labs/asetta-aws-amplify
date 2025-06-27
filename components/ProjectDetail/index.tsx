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
import { ConnectWallet } from '@/components/Wallet/ConnectWallet';

const client = generateClient<Schema>();

interface IProjectDetails {
    id: string
}

const ProjectDetailContainer = ({ id }: IProjectDetails) => {
    const [project, setProject] = useState<any>(null);
    const [documents, setDocuments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [isLoggedIn, setLoggedIn] = useState(false)

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
                    
                    // Fetch project documents
                    const { data: documentsData } = await client.models.ProjectDocument.list({
                        filter: { projectId: { eq: id } },
                        authMode: isLoggedIn ? 'userPool' : "iam"
                    });
                    
                    if (documentsData) {
                        setDocuments(documentsData);
                    }
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

    const getDocumentTypeIcon = (type: string) => {
        switch (type.toUpperCase()) {
            case 'PROSPECTUS':
                return <FileText size={16} className="text-blue-400" />;
            case 'FINANCIAL':
                return <FileText size={16} className="text-green-400" />;
            case 'LEGAL':
                return <Shield size={16} className="text-red-400" />;
            case 'TECHNICAL':
                return <FileText size={16} className="text-purple-400" />;
            case 'COMPLIANCE':
                return <CheckCircle size={16} className="text-orange-400" />;
            default:
                return <FileText size={16} className="text-gray-400" />;
        }
    };

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
        <div className="h-screen flex">
            {/* Left Side - Project Details */}
            <div className="w-1/2 bg-gray-50 overflow-y-auto">
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
                            {['overview', 'financials', 'token-info', 'invest-now', 'kyc', 'documents'].map((tab) => (
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
                                    {project.minimumInvestment && (
                                        <div>
                                            <div className="text-2xl font-light mb-1">${project.minimumInvestment}</div>
                                            <div className="text-sm text-gray-500">Min. Investment</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'invest-now' && (
                        <div className="space-y-6">
                            {/* Investment Summary */}
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-light mb-4">Investment Summary</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <div className="text-2xl font-light mb-1">${project.tokenPrice}</div>
                                        <div className="text-sm text-gray-500">Price per Token</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-light text-green-600 mb-1">{project.yieldRate || 'N/A'}</div>
                                        <div className="text-sm text-gray-500">Expected Annual Yield</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-light mb-1">{project.minimumInvestment ? `${project.minimumInvestment}` : 'No minimum'}</div>
                                        <div className="text-sm text-gray-500">Minimum Investment</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-light mb-1">
                                            {Math.round(((parseInt(project.totalTokens) - parseInt(project.tokensSold || '0')) / parseInt(project.totalTokens)) * 100)}%
                                        </div>
                                        <div className="text-sm text-gray-500">Available</div>
                                    </div>
                                </div>
                            </div>

                            {/* Connect Wallet & Investment Interface */}
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-light mb-4">Connect Wallet & Invest</h3>
                                <ConnectWallet projectData={project} />
                            </div>

                            {/* Investment Calculator */}
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-light mb-4">Investment Calculator</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-light text-gray-600 mb-2">
                                            Investment Amount (USD)
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Enter amount"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            onChange={(e) => {
                                                const amount = parseFloat(e.target.value) || 0;
                                                const tokenPrice = parseFloat(project.tokenPrice) || 0;
                                                const tokens = tokenPrice > 0 ? amount / tokenPrice : 0;
                                                const yieldRate = parseFloat(project.yieldRate?.replace('%', '') || '0') / 100;
                                                const annualReturn = amount * yieldRate;
                                                
                                                // Update calculator display (you can add state for this)
                                                const tokensEl = document.getElementById('calc-tokens');
                                                const returnEl = document.getElementById('calc-return');
                                                const monthlyEl = document.getElementById('calc-monthly');
                                                
                                                if (tokensEl) tokensEl.textContent = tokens.toFixed(2);
                                                if (returnEl) returnEl.textContent = `${annualReturn.toFixed(2)}`;
                                                if (monthlyEl) monthlyEl.textContent = `${(annualReturn / 12).toFixed(2)}`;
                                            }}
                                        />
                                    </div>
                                    
                                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                                        <div>
                                            <div className="text-lg font-light mb-1" id="calc-tokens">0</div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wide">Tokens</div>
                                        </div>
                                        <div>
                                            <div className="text-lg font-light text-green-600 mb-1" id="calc-return">$0</div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wide">Annual Return</div>
                                        </div>
                                        <div>
                                            <div className="text-lg font-light mb-1" id="calc-monthly">$0</div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wide">Monthly Return</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Investment Risks & Disclaimers */}
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-light mb-4">Important Information</h3>
                                <div className="space-y-3 text-sm text-gray-600">
                                    <div className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <p>This is a tokenized real-world asset investment. Returns are not guaranteed and depend on property performance.</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <p>Tokens represent fractional ownership and may be subject to regulatory restrictions in your jurisdiction.</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <p>Complete KYC verification may be required before investment depending on your location and investment amount.</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <p>Please read all project documents and consult with financial advisors before investing.</p>
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
                                        <span className="ml-2 font-light">{project.requiredKycLevel || 'Not specified'}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Jurisdiction:</span>
                                        <span className="ml-2 font-light">{project.jurisdiction || 'Not specified'}</span>
                                    </div>
                                    {project.regulatoryFramework && (
                                        <div>
                                            <span className="text-gray-500">Framework:</span>
                                            <span className="ml-2 font-light">{project.regulatoryFramework}</span>
                                        </div>
                                    )}
                                    {project.investorRestrictions && project.investorRestrictions.length > 0 && (
                                        <div>
                                            <span className="text-gray-500">Investor Restrictions:</span>
                                            <div className="ml-2 font-light">
                                                {project.investorRestrictions.map((restriction: string, index: number) => (
                                                    <div key={index} className="text-sm text-gray-600">• {restriction}</div>
                                                ))}
                                            </div>
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
                                {documents.length > 0 ? (
                                    <div className="space-y-3">
                                        {documents.map((document) => (
                                            <div key={document.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                                                <div className="flex items-center gap-3">
                                                    {getDocumentTypeIcon(document.documentType || 'DEFAULT')}
                                                    <div>
                                                        <div className="font-light">{document.name}</div>
                                                        <div className="text-xs text-gray-500">{document.type}</div>
                                                    </div>
                                                </div>
                                                {document.url ? (
                                                    <a
                                                        href={document.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-blue-600 hover:text-blue-800"
                                                    >
                                                        <Download size={14} className="inline mr-1" />
                                                        Download
                                                    </a>
                                                ) : (
                                                    <span className="text-sm text-gray-400">Coming soon</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <FileText size={48} className="mx-auto mb-2 opacity-50" />
                                        <p className="text-sm">No documents available yet</p>
                                        <p className="text-xs text-gray-400 mt-1">Documents will be uploaded as they become available</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side - AI Chat Assistant */}
            <div className="w-1/2 bg-white flex flex-col border-l border-gray-200">
                {!isLoggedIn ? (
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                        <p className="text-gray-600 text-sm mb-4">Please log in to use the AI assistant features.</p>
                        <Link href="/dashboard">
                            <button className="bg-black cursor-pointer text-white px-6 py-2 text-sm font-light hover:bg-gray-800 transition-colors">
                                Go to Login
                            </button>
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Chat Header */}
                        <div className="bg-white p-6 border-b border-gray-200 flex-shrink-0">
                            <div className="text-xl font-light text-gray-800 mb-2 tracking-tight">AI Investment Assistant</div>
                            <div className="text-sm text-gray-500 font-light">Get help with investment questions, KYC, and token purchases</div>
                        </div>

                        {/* Chat Container */}
                        <div className="flex-1 min-h-0 flex flex-col">
                            <div className="flex-1 overflow-hidden">
                                <AIConversation projectId={id} projectData={project} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ProjectDetailContainer