// Types aligned with AWS Amplify backend schema

export interface Project {
  id: string;
  userProfileId: string;
  name: string;
  type: string;
  location: string;
  value: string;
  yieldRate?: string;
  occupancy?: string;
  tokensSold: string;
  totalTokens: string;
  tokenPrice: string;
  previewImage?: string;
  images?: string[];
  status: ProjectStatus;
  category: ProjectCategory;
  
  // Asset-specific fields
  yearBuilt?: string;
  squareFootage?: string;
  maturityDate?: string;
  couponRate?: number;
  creditRating?: string;
  commodityGrade?: string;
  storageLocation?: string;
  smartContractId?: string;
  
  // Metadata and requirements
  assetMetadata?: AssetMetadata;
  kycRequirements?: KYCRequirements;
  requiredKycLevel: KYCLevel;
  jurisdiction: string;
  regulatoryFramework: string;
  minimumInvestment: string;
  maximumInvestment: string;
  investorRestrictions?: string[];
  
  // Related data
  documents?: ProjectDocument[];
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export type ProjectStatus = 
  | 'PREPARE' 
  | 'ACTIVE' 
  | 'LAUNCHING_SOON' 
  | 'COMPLETED' 
  | 'PAUSED' 
  | 'CANCELLED';

export type ProjectCategory = 
  // Real Estate
  | 'COMMERCIAL' 
  | 'RESIDENTIAL' 
  | 'MIXED_USE' 
  | 'INDUSTRIAL' 
  | 'RETAIL'
  // Financial Assets
  | 'TREASURY' 
  | 'CORPORATE_BOND' 
  | 'MUNICIPAL_BOND' 
  | 'GOVERNMENT_BOND'
  // Commodities
  | 'PRECIOUS_METALS' 
  | 'ENERGY' 
  | 'AGRICULTURE' 
  | 'INDUSTRIAL_METALS';

export type KYCLevel = 'BASIC' | 'ENHANCED' | 'INSTITUTIONAL';

export type KYCStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW' | 'EXPIRED';

export type DocumentType = 'PROSPECTUS' | 'FINANCIAL' | 'LEGAL' | 'TECHNICAL' | 'COMPLIANCE';

export interface AssetMetadata {
  description?: string;
  keyFeatures?: string[];
  financials?: {
    [key: string]: string | number;
  };
  [key: string]: any; // Flexible for asset-specific data
}

export interface KYCRequirements {
  individual?: string[];
  institutional?: string[];
  [key: string]: any;
}

export interface ProjectDocument {
  id: string;
  name: string;
  type: string;
  size?: string;
  url?: string;
  documentType: DocumentType;
  isPublic?: boolean;
}

export interface ProjectKYC {
  id: string;
  userProfileId: string;
  projectId: string;
  kycStatus: KYCStatus;
  kycLevel: KYCLevel;
  jurisdiction?: string;
  kycDocuments?: string[];
  approvedAt?: string;
  expiresAt?: string;
  reviewedBy?: string;
  reviewNotes?: string;
  complianceScore?: number;
  riskRating?: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
}

export interface UserProfile {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  nationality?: string;
  walletAddress?: string;
}

// Investment portfolio types (for dashboard)
export interface PortfolioInvestment {
  projectId: number;
  projectName: string;
  tokensOwned: number;
  tokenPrice: number;
  currentValue: number;
  totalInvested: number;
  roi: number;
  kycStatus: KYCStatus;
}

// Utility types for filtering and display
export interface CategoryDisplayMap {
  [key: string]: string;
}

export interface StatusDisplayMap {
  [key: string]: string;
}

// Search and filter types
export interface ProjectFilters {
  searchTerm: string;
  category: string;
  status: string;
  sortBy: string;
}

// API response types (for AWS Amplify integration)
export interface ProjectResponse {
  data: Project[];
  nextToken?: string;
}

export interface ProjectCreateInput {
  userProfileId: string;
  name: string;
  type: string;
  location: string;
  value: string;
  yieldRate?: string;
  occupancy?: string;
  tokensSold?: string;
  totalTokens: string;
  tokenPrice: string;
  status: ProjectStatus;
  category: ProjectCategory;
  yearBuilt?: string;
  squareFootage?: string;
  maturityDate?: string;
  couponRate?: number;
  creditRating?: string;
  commodityGrade?: string;
  storageLocation?: string;
  assetMetadata?: AssetMetadata;
  kycRequirements?: KYCRequirements;
  requiredKycLevel: KYCLevel;
  jurisdiction: string;
  regulatoryFramework: string;
  minimumInvestment: string;
  maximumInvestment: string;
  investorRestrictions?: string[];
}

export interface ProjectUpdateInput extends Partial<ProjectCreateInput> {
  id: string;
}