// Types for the dashboard data structures

export interface UserProfile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  walletAddress: string;
  accessKey: string;
}

export interface PortfolioInvestment {
  projectId: number;
  projectName: string;
  tokensOwned: number;
  tokenPrice: number;
  currentValue: number;
  totalInvested: number;
  roi: number;
  kycStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW' | 'EXPIRED';
}

export interface CreatedProject {
  id: number;
  name: string;
  type: string;
  value: string;
  status: 'PREPARE' | 'ACTIVE' | 'LAUNCHING_SOON' | 'COMPLETED' | 'PAUSED' | 'CANCELLED';
  tokensSold: string;
  totalTokens: string;
  revenue: string;
}

export interface RWAToken {
  symbol: string;
  name: string;
  balance: number;
  price: number;
}

export interface ProjectKYC {
  projectId: number;
  projectName: string;
  kycStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW' | 'EXPIRED';
  approvedAt?: string;
  expiresAt?: string;
  reviewNotes?: string;
}