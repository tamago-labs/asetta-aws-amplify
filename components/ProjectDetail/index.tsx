"use client"

import { useState } from 'react';
import { MapPin, Calendar, Users, Shield, Download, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { getProjectById } from "../../data/mockData"
import Breadcrumb from '../Breadcrumb';

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

    const project = getProjectById(parseInt(id || '1', 10)) || getProjectById(1);

    const [activeTab, setActiveTab] = useState('primary-sales');
    const [investmentAmount, setInvestmentAmount] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            type: 'ai',
            content: `Welcome to ${project?.name}. I'm your AI investment assistant, here to help you with everything from understanding the investment opportunity to completing your KYC process. This premium ${project?.type.toLowerCase()} offers excellent returns with a ${project?.yield} annual yield. How can I assist you today?`,
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [kycStarted, setKycStarted] = useState(false);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        setTimeout(() => {
            let aiResponse = '';

            if (inputValue.toLowerCase().includes('kyc') || inputValue.toLowerCase().includes('verification')) {
                aiResponse = 'I can help you start the KYC process right now. I\'ll need to collect some basic information including your identity verification, proof of address, and investment experience. Shall we begin with your personal details?';
                setKycStarted(true);
            } else if (inputValue.toLowerCase().includes('invest') || inputValue.toLowerCase().includes('buy')) {
                aiResponse = `Great! For ${project?.name}, tokens are priced at ${project?.tokenPrice} each. The minimum investment is $1,000 (100 tokens). I can help you calculate potential returns and guide you through the purchase process. Would you like me to start the investment flow?`;
            } else if (inputValue.toLowerCase().includes('return') || inputValue.toLowerCase().includes('yield')) {
                aiResponse = `This property generates a ${project?.yield} annual yield through rental income. With 98% occupancy and stable long-term tenants, it provides consistent monthly distributions. Would you like me to calculate potential returns for a specific investment amount?`;
            } else {
                aiResponse = 'Thank you for your question. I can provide detailed information about the investment opportunity, help calculate returns, assist with KYC verification, or guide you through the token purchase process. What specific aspect would you like to explore?';
            }

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'ai',
                content: aiResponse,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
        }, 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const quickActions = [
        { text: 'Start KYC Process', action: () => setInputValue('I want to start the KYC verification process') },
        { text: 'Calculate Returns', action: () => setInputValue('Calculate returns for $5,000 investment') },
        { text: 'View Documents', action: () => setInputValue('Show me the property documents and prospectus') },
        { text: 'Investment Process', action: () => setInputValue('How do I invest in this property?') }
    ];

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <div className="flex h-screen">
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
                        {project.image}
                    </div>

                    <h1 className="text-4xl font-extralight text-gray-800 mb-2 tracking-tight">{project.name}</h1>
                    <p className="text-lg text-gray-600 font-light mb-4">{project.description}</p>

                    <div className="flex items-center gap-6 text-sm text-gray-500 font-light">
                        <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{project.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>Built {project.yearBuilt}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Users size={14} />
                            <span>{project.squareFootage}</span>
                        </div>
                    </div>
                </div>
                {/* Tabs */}
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
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
                {/* Tab Content */}
                <div className="p-8">
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            {/* Key Metrics */}
                            <div className="grid grid-cols-4 gap-6">
                                <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
                                    <div className="text-3xl font-extralight text-gray-800 mb-2">{project.value}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wide">Property Value</div>
                                </div>
                                <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
                                    <div className="text-3xl font-extralight text-green-600 mb-2">{project.yield}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wide">Annual Yield</div>
                                </div>
                                <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
                                    <div className="text-3xl font-extralight text-gray-800 mb-2">{project.occupancy}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wide">Occupancy Rate</div>
                                </div>
                                <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
                                    <div className="text-3xl font-extralight text-gray-800 mb-2">{project.tokenPrice}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wide">Token Price</div>
                                </div>
                            </div>

                            {/* Investment Progress */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-lg font-light mb-4">Investment Progress</h3>
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <div className="text-2xl font-light mb-1">{project.tokensSold}</div>
                                        <div className="text-sm text-gray-500">Tokens Sold</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-light mb-1">{project.totalTokens}</div>
                                        <div className="text-sm text-gray-500">Total Tokens</div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex justify-between text-sm font-light mb-2">
                                        <span>Progress</span>
                                        <span>73% complete</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-black h-2 rounded-full" style={{ width: '73%' }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Key Features */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-lg font-light mb-4">Key Features</h3>
                                <ul className="space-y-3">
                                    {project.keyFeatures.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-3 text-sm font-light text-gray-700">
                                            <div className="w-2 h-2 bg-black rounded-full"></div>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                    {activeTab === 'financials' && (
                        <div className="space-y-8">
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-lg font-light mb-6">Financial Overview</h3>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-sm text-gray-500 font-light">Monthly Rent</span>
                                            <span className="text-sm text-gray-800 font-medium">{project.financials.monthlyRent}</span>
                                        </div>
                                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded text-sm font-light hover:bg-blue-700 transition-colors">
                                            Submit RFQ
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'token-info' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <h3 className="text-base font-light mb-4">Token Structure</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="space-y-3">
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-500 font-light">Token Standard</span>
                                            <span className="font-medium">ERC-20</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-500 font-light">Total Supply</span>
                                            <span className="font-medium">{project.totalTokens}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-500 font-light">Par Value</span>
                                            <span className="font-medium">$10.00</span>
                                        </div>
                                        <div className="flex justify-between py-2">
                                            <span className="text-gray-500 font-light">Transferable</span>
                                            <span className="font-medium text-green-600">Yes*</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-500 font-light">Voting Rights</span>
                                            <span className="font-medium">Yes</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-500 font-light">Distribution Rights</span>
                                            <span className="font-medium">Quarterly</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-500 font-light">Liquidation Rights</span>
                                            <span className="font-medium">Pro-rata</span>
                                        </div>
                                        <div className="flex justify-between py-2">
                                            <span className="text-gray-500 font-light">Lock-up Period</span>
                                            <span className="font-medium">12 months</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <AlertCircle size={16} className="text-yellow-600 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm font-medium text-yellow-800 mb-2">Transfer Restrictions</h4>
                                        <p className="text-xs text-yellow-700 font-light">
                                            *Tokens are subject to a 12-month lock-up period and can only be transferred to accredited investors who have completed KYC verification.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <h4 className="text-base font-light mb-3">Smart Contract Features</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-3 text-sm font-light text-gray-700">
                                        <CheckCircle size={16} className="text-green-600" />
                                        <span>Automated quarterly dividend distributions</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm font-light text-gray-700">
                                        <CheckCircle size={16} className="text-green-600" />
                                        <span>On-chain voting for major property decisions</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm font-light text-gray-700">
                                        <CheckCircle size={16} className="text-green-600" />
                                        <span>KYC-gated transfers and compliance checks</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm font-light text-gray-700">
                                        <CheckCircle size={16} className="text-green-600" />
                                        <span>Emergency pause functionality</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm font-light text-gray-700">
                                        <CheckCircle size={16} className="text-green-600" />
                                        <span>Upgrade proxy for regulatory compliance</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                    {activeTab === 'kyc' && (
                        <div className="space-y-6">
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <Shield size={20} className="text-orange-600" />
                                    <h3 className="text-lg font-light text-orange-800">KYC Requirements</h3>
                                </div>
                                <p className="text-sm text-orange-700 font-light">
                                    All investors must complete KYC verification before participating in token sales or transfers.
                                </p>
                            </div>

                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <h4 className="text-base font-light mb-4">Individual Investors</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span className="text-sm font-light text-gray-700">Government-issued photo ID</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span className="text-sm font-light text-gray-700">Proof of address (utility bill, bank statement)</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span className="text-sm font-light text-gray-700">Accredited investor verification</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span className="text-sm font-light text-gray-700">Investment experience questionnaire</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <h4 className="text-base font-light mb-4">Institutional Investors</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        <span className="text-sm font-light text-gray-700">Certificate of incorporation</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        <span className="text-sm font-light text-gray-700">Board resolution authorizing investment</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        <span className="text-sm font-light text-gray-700">Authorized signatory identification</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        <span className="text-sm font-light text-gray-700">AML/CTF compliance documentation</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-100 rounded-lg p-4">
                                <h4 className="text-base font-light mb-3">Verification Process</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">1</div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-800">Document Upload</div>
                                            <div className="text-xs text-gray-600 font-light">Upload required documents via secure portal</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">2</div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-800">Identity Verification</div>
                                            <div className="text-xs text-gray-600 font-light">Video call with compliance team (24-48 hours)</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">3</div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-800">Approval</div>
                                            <div className="text-xs text-gray-600 font-light">Receive KYC approval and investment access</div>
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full bg-green-600 text-white py-2 px-4 rounded text-sm font-light hover:bg-green-700 transition-colors mt-4">
                                    Start KYC Process
                                </button>
                            </div>
                        </div>
                    )}
                    {activeTab === 'documents' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-lg font-light mb-6">Project Documents</h3>
                                <div className="space-y-4">
                                    {project.documents.map((doc, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <FileText size={20} className="text-gray-400" />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-800">{doc.name}</div>
                                                    <div className="text-xs text-gray-500">{doc.type} • {doc.size}</div>
                                                </div>
                                            </div>
                                            <button className="flex items-center gap-2 text-sm font-light text-blue-600 hover:text-blue-800 transition-colors">
                                                <Download size={16} />
                                                Download
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                                <div className="flex items-start gap-3">
                                    <Shield size={20} className="text-yellow-600 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm font-medium text-yellow-800 mb-2">Document Verification</h4>
                                        <p className="text-sm text-yellow-700 font-light">
                                            All documents have been verified by our legal team and compliance partners.
                                            Digital signatures and blockchain verification ensure document authenticity.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>


            </div>

            {/* Right Side - AI Chat Assistant */}
            <div className="flex-1 bg-white flex flex-col border-l border-gray-200 max-w-md">
                <>
                    <div className="bg-white p-6 border-b border-gray-200">
                        <div className="text-xl font-light text-gray-800 mb-2 tracking-tight">AI Investment Assistant</div>
                        <div className="text-sm text-gray-500 font-light">KYC verification, investment guidance & purchase support</div>

                        <div className="flex items-center gap-3 mt-4 p-3 bg-gray-50 rounded border border-gray-200">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <div className="text-xs text-gray-500 font-light">AI assistant active</div>
                        </div>
                    </div>

                    <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
                        {messages.map((message) => (
                            <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'self-end flex-row-reverse max-w-3/4' : 'max-w-3/4'}`}>
                                <div className={`w-10 h-10 rounded flex items-center justify-center text-white text-sm flex-shrink-0 ${message.type === 'ai' ? 'bg-gray-700' : 'bg-blue-500'
                                    }`}>
                                    {message.type === 'ai' ? 'AI' : 'U'}
                                </div>
                                <div className={`p-4 rounded text-sm leading-relaxed font-light border ${message.type === 'user'
                                    ? 'bg-blue-500 text-white border-transparent'
                                    : 'bg-gray-50 border-gray-200 text-gray-800'
                                    }`}>
                                    {message.content}
                                    {message.type === 'ai' && message.id === '1' && (
                                        <div className="mt-4 space-y-2">
                                            {quickActions.map((action, index) => (
                                                <button
                                                    key={index}
                                                    onClick={action.action}
                                                    className="block w-full text-left px-3 py-2 bg-white border border-gray-200 rounded text-xs text-gray-700 hover:bg-gray-100 hover:border-blue-500 hover:text-blue-600 transition-all font-normal"
                                                >
                                                    {action.text}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {kycStarted && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h4 className="text-sm font-medium text-blue-800 mb-2">KYC Process Started</h4>
                                <p className="text-sm text-blue-700 font-light mb-3">
                                    I'll guide you through the verification process step by step.
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs">
                                        <div className="w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">1</div>
                                        <span className="text-blue-700 font-light">Personal Information</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <div className="w-4 h-4 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs">2</div>
                                        <span className="text-gray-600 font-light">Identity Verification</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <div className="w-4 h-4 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs">3</div>
                                        <span className="text-gray-600 font-light">Address Verification</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {messages.length === 1 && (
                            <div className="text-center text-gray-400 italic font-light mt-16 text-sm">
                                Ask about investment details, start KYC, or begin the purchase process...
                            </div>
                        )}
                    </div>

                    <div className="p-6 bg-white border-t border-gray-200">
                        <div className="flex gap-3 items-end">
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="flex-1 p-3 border border-gray-300 rounded text-gray-800 resize-none min-h-6 max-h-24 font-light text-sm transition-colors focus:outline-none focus:border-blue-500"
                                placeholder="Ask about investment, KYC process, or how to purchase tokens..."
                                rows={1}
                            />
                            <button
                                onClick={handleSend}
                                className="bg-blue-500 text-white border-none rounded px-6 py-3 cursor-pointer font-normal text-sm tracking-wide transition-colors hover:bg-blue-600"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </>
            </div>
        </div>
    )
}

export default ProjectDetailContainer