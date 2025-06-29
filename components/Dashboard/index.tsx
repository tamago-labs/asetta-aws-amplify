'use client';

import { useState, useEffect, useContext, useCallback } from 'react';
import {
    User,
    Wallet,
    Building2,
    TrendingUp,
    Shield,
    Key,
    Edit2,
    Check,
    X,
    Copy,
    RefreshCw,
    Plus,
    ExternalLink,
    DollarSign,
    BarChart3,
    FileCheck,
    Settings,
    Bell,
    Monitor
} from 'lucide-react'; 
import { UserProfile, PortfolioInvestment, CreatedProject, RWAToken } from '@/types/dashboard';
import PortfolioAnalytics from './PortfolioAnalytics';
import CreateProjectModal from './CreateProjectModal';
import WalletButton from './WalletButton';
import { AccountContext } from '@/contexts/account';
 

const mockPortfolio: PortfolioInvestment[] = [
    {
        projectId: 1,
        projectName: 'Manhattan Prime Properties',
        tokensOwned: 150,
        tokenPrice: 10.00,
        currentValue: 1500.00,
        totalInvested: 1400.00,
        roi: 7.14,
        kycStatus: 'APPROVED'
    },
    {
        projectId: 2,
        projectName: 'Austin Tech Hub',
        tokensOwned: 250,
        tokenPrice: 10.00,
        currentValue: 2500.00,
        totalInvested: 2300.00,
        roi: 8.70,
        kycStatus: 'APPROVED'
    },
    {
        projectId: 4,
        projectName: 'Seattle Office Complex',
        tokensOwned: 100,
        tokenPrice: 10.00,
        currentValue: 1000.00,
        totalInvested: 980.00,
        roi: 2.04,
        kycStatus: 'UNDER_REVIEW'
    }
];

const mockCreatedProjects: CreatedProject[] = [
    {
        id: 101,
        name: 'Denver Logistics Center',
        type: 'Industrial/Warehouse',
        value: '$8.2M',
        status: 'ACTIVE',
        tokensSold: '450K',
        totalTokens: '820K',
        revenue: '$24,500'
    },
    {
        id: 102,
        name: 'Phoenix Solar Farm',
        type: 'Energy/Renewable',
        value: '$12.1M',
        status: 'LAUNCHING_SOON',
        tokensSold: '0',
        totalTokens: '1.21M',
        revenue: '$0'
    }
];

const mockRWATokens: RWAToken[] = [
    { symbol: 'MPP', name: 'Manhattan Prime Properties', balance: 150, price: 10.00 },
    { symbol: 'ATH', name: 'Austin Tech Hub', balance: 250, price: 10.00 },
    { symbol: 'SOC', name: 'Seattle Office Complex', balance: 100, price: 10.00 },
    { symbol: 'DLC', name: 'Denver Logistics Center', balance: 500, price: 10.00 }
];


const DashboardContainer = () => {

    const { profile, saveProfile } = useContext(AccountContext)
    const [copied, setCopied] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<any>();
    const [activeTab, setActiveTab] = useState('portfolio');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
 

    useEffect(() => {
        profile && setEditForm(profile)
    }, [profile])
 

    const handleSaveProfile = useCallback(async () => {
        setIsEditing(false);
        console.log("edit form:", editForm)
        await saveProfile(profile.id, editForm)
    }, [profile, editForm])
 

    const handleCreateProject = (projectData: any) => {
        // In real app, this would call AWS Amplify API
        console.log('Creating project:', projectData);
        // Add to mock data temporarily
        setIsCreateModalOpen(false);

    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true)
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'APPROVED': return 'text-green-600 bg-green-50';
            case 'UNDER_REVIEW': return 'text-yellow-600 bg-yellow-50';
            case 'PENDING': return 'text-blue-600 bg-blue-50';
            case 'REJECTED': return 'text-red-600 bg-red-50';
            case 'ACTIVE': return 'text-green-600 bg-green-50';
            case 'LAUNCHING_SOON': return 'text-blue-600 bg-blue-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    if (!profile) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="flex flex-col pb-[200px] items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                <p className="text-gray-600 font-light">Loading user details...</p>
            </div>
        </div>
    }

    return (
        <div className="min-h-screen bg-gray-50">

<header className="bg-white border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-6 py-4">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-600">
          <b>Disclaimer:</b> This client-side version is under development and not fully functional. Please use the desktop app for seamless RWA project creation with AI
        </p>
      </div>
    </div>
  </div>
</header>

            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-light text-gray-900">Dashboard</h1>
                            <p className="text-sm text-gray-600">Manage your RWA investments and projects</p>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* <WalletButton /> */}
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Profile & Stats */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* User Profile Card */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-medium text-gray-900">Profile</h2>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                            </div>

                            {!isEditing ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                            <User className="w-6 h-6 text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{profile.firstName} {profile.lastName}</p>

                                        </div>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <p><span className="text-gray-600">Email:</span> {profile.email}</p>
                                        {/* <p><span className="text-gray-600">Phone:</span> {profile.phone}</p> */}
                                        <p><span className="text-gray-600">Nationality:</span> {profile.nationality}</p>
                                        <p><span className="text-gray-600">Joined:</span> {new Date(profile.createdAt).toLocaleDateString()}</p>
                                        {/* <p><span className="text-gray-600">DOB:</span> {profile.dateOfBirth}</p> */}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            value={editForm.firstName}
                                            onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                                            className="border border-gray-300 rounded px-3 py-2 text-sm"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            value={editForm.lastName}
                                            onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                                            className="border border-gray-300 rounded px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={editForm.email}
                                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                    />
                                    {/* <input
                                        type="tel"
                                        placeholder="Phone"
                                        value={editForm.phone}
                                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                    /> */}
                                    <input
                                        type="text"
                                        placeholder="Nationality"
                                        value={editForm.nationality}
                                        onChange={(e) => setEditForm({ ...editForm, nationality: e.target.value })}
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSaveProfile}
                                            className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 text-sm rounded hover:bg-green-700"
                                        >
                                            <Check className="w-4 h-4" />
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="flex items-center gap-1 bg-gray-500 text-white px-3 py-2 text-sm rounded hover:bg-gray-600"
                                        >
                                            <X className="w-4 h-4" />
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Access Key - use userId for now */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900">Desktop App Access</h3>
                                <Monitor className="w-5 h-5 text-gray-500" />
                            </div>
                            <p className="text-sm text-gray-600 mb-3">Use this key to connect the desktop application for creating RWA projects</p>
                            <div className="bg-gray-50 rounded border p-3 font-mono text-sm break-all">
                                {profile.id}
                            </div>
                            <button
                                onClick={() => copyToClipboard(profile.id)}
                                className="mt-3 flex items-center cursor-pointer gap-2 text-sm text-blue-600 hover:text-blue-700"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}

                                Copy Access Key
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Tabs Content */}
                    <div className="lg:col-span-2">

                        {/* Tabs Navigation */}
                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="border-b border-gray-200">
                                <nav className="flex space-x-8 px-6" aria-label="Tabs">
                                    {[
                                        { id: 'portfolio', name: 'Investment Portfolio', icon: TrendingUp },
                                        { id: 'tokens', name: 'RWA Tokens', icon: DollarSign },
                                        { id: 'projects', name: 'My Projects', icon: Building2 },
                                        { id: 'kyc', name: 'KYC Status', icon: Shield }
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`${activeTab === tab.id
                                                ? 'border-black text-black'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                                        >
                                            <tab.icon className="w-4 h-4" />
                                            {tab.name}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <div className="p-6">

                                {/* Investment Portfolio Tab */}
                                {activeTab === 'portfolio' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-medium text-gray-900">Investment Portfolio</h3>
                                            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                                <RefreshCw className="w-4 h-4" />
                                                Refresh
                                            </button>
                                        </div>

                                        {/* Portfolio Analytics Component */}
                                        <PortfolioAnalytics portfolio={mockPortfolio} />

                                        <div className="space-y-4">
                                            {mockPortfolio.map((investment) => (
                                                <div key={investment.projectId} className="border border-gray-200 rounded-lg p-4">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div>
                                                            <h4 className="font-medium text-gray-900">{investment.projectName}</h4>
                                                            <div className="flex items-center gap-4 mt-2">
                                                                <span className="text-sm text-gray-600">
                                                                    {investment.tokensOwned} tokens
                                                                </span>
                                                                <span className={`text-xs px-2 py-1 rounded ${getStatusColor(investment.kycStatus)}`}>
                                                                    {investment.kycStatus}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-medium text-gray-900">${investment.currentValue.toLocaleString()}</p>
                                                            <p className={`text-sm ${investment.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                                {investment.roi >= 0 ? '+' : ''}{investment.roi.toFixed(2)}%
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                                        <div>
                                                            <p className="text-gray-600">Token Price</p>
                                                            <p className="font-medium">${investment.tokenPrice}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-600">Total Invested</p>
                                                            <p className="font-medium">${investment.totalInvested}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-600">Current Value</p>
                                                            <p className="font-medium">${investment.currentValue}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* RWA Tokens Tab */}
                                {activeTab === 'tokens' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-medium text-gray-900">RWA Token Balances</h3>
                                            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                                <RefreshCw className="w-4 h-4" />
                                                Refresh Balances
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {mockRWATokens.map((token) => (
                                                <div key={token.symbol} className="border border-gray-200 rounded-lg p-4">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h4 className="font-medium text-gray-900">{token.symbol}</h4>
                                                            <p className="text-sm text-gray-600">{token.name}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-medium text-gray-900">{token.balance}</p>
                                                            <p className="text-sm text-gray-600">${(token.balance * token.price).toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 pt-3 border-t border-gray-100">
                                                        <p className="text-sm text-gray-600">Price: ${token.price}/token</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* My Projects Tab */}
                                {activeTab === 'projects' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-medium text-gray-900">My RWA Projects</h3>
                                            <button
                                                onClick={() => setIsCreateModalOpen(true)}
                                                className="flex items-center gap-2 bg-black text-white px-4 py-2 text-sm font-light hover:bg-gray-800 transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                                Create Project
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            {mockCreatedProjects.map((project) => (
                                                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div>
                                                            <h4 className="font-medium text-gray-900">{project.name}</h4>
                                                            <p className="text-sm text-gray-600">{project.type}</p>
                                                            <span className={`inline-block mt-2 text-xs px-2 py-1 rounded ${getStatusColor(project.status)}`}>
                                                                {project.status}
                                                            </span>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-medium text-gray-900">{project.value}</p>
                                                            <p className="text-sm text-gray-600">Total Value</p>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                                        <div>
                                                            <p className="text-gray-600">Tokens Sold</p>
                                                            <p className="font-medium">{project.tokensSold}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-600">Total Tokens</p>
                                                            <p className="font-medium">{project.totalTokens}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-600">Revenue</p>
                                                            <p className="font-medium">{project.revenue}</p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                                                        <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                                                            <BarChart3 className="w-4 h-4" />
                                                            Analytics
                                                        </button>
                                                        <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                                                            <Settings className="w-4 h-4" />
                                                            Manage
                                                        </button>
                                                        <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                                                            <ExternalLink className="w-4 h-4" />
                                                            View Project
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* KYC Status Tab */}
                                {activeTab === 'kyc' && (
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-medium text-gray-900">KYC Status</h3>

                                        <div className="space-y-4">
                                            {mockPortfolio.map((investment) => (
                                                <div key={investment.projectId} className="border border-gray-200 rounded-lg p-4">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <h4 className="font-medium text-gray-900">{investment.projectName}</h4>
                                                            <p className="text-sm text-gray-600">Project #{investment.projectId}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <span className={`inline-block text-xs px-3 py-1 rounded-full ${getStatusColor(investment.kycStatus)}`}>
                                                                {investment.kycStatus}
                                                            </span>
                                                            {investment.kycStatus === 'APPROVED' && (
                                                                <p className="text-xs text-gray-500 mt-1">Verified on 2024-01-15</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {investment.kycStatus === 'UNDER_REVIEW' && (
                                                        <div className="mt-3 pt-3 border-t border-gray-100">
                                                            <p className="text-sm text-gray-600">Review in progress. Expected completion in 2-3 business days.</p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="bg-blue-50 rounded-lg p-4">
                                            <div className="flex items-start gap-3">
                                                <FileCheck className="w-5 h-5 text-blue-600 mt-1" />
                                                <div>
                                                    <h4 className="font-medium text-blue-900">Complete Your KYC</h4>
                                                    <p className="text-sm text-blue-700 mt-1">
                                                        To invest in more projects, ensure your KYC documentation is up to date and approved.
                                                    </p>
                                                    <button className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium">
                                                        Update KYC Documents →
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Project Modal */}
            <CreateProjectModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateProject}
            />
        </div>
    )
}

export default DashboardContainer