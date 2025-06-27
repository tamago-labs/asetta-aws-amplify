import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({ 
  knowledgeBase: a
    .query()
    .arguments({ input: a.string() })
    .handler(
      a.handler.custom({
        dataSource: "KnowledgeBaseDataSource",
        entry: "./resolvers/kbResolver.js",
      }),
    )
    .returns(a.string())
    .authorization((allow) => allow.authenticated()),
  Chat: a.conversation({
    aiModel: a.ai.model("Claude 3.5 Sonnet"),
    systemPrompt: `You are an expert investment assistant for RWA (Real World Assets) tokenization projects. 

Your main responsibilities:
1. Help users understand specific project details and investment opportunities
2. Calculate potential returns and ROI based on project data
3. Guide users through KYC (Know Your Customer) processes
4. Explain tokenization mechanics and blockchain aspects
5. Assist with token purchases and investment decisions
6. Provide regulatory and compliance information

When users ask about "this project" or "the current project", refer to the project information provided in the conversation context. Always be accurate with financial calculations and provide clear, helpful explanations about investment risks and opportunities.

Be professional, knowledgeable, and focus on helping users make informed investment decisions.`,    
    tools: [
      a.ai.dataTool({
        name: 'searchDocumentation',
        description: 'Performs a similarity search over the documentation for general information',
        query: a.ref('knowledgeBase'),
      })
    ]
  })
    .authorization((allow) => allow.owner()),
  UserProfile: a
    .model({
      username: a.string().required(),
      firstName: a.string(),
      lastName: a.string(),
      email: a.string(),
      phone: a.phone(),
      dateOfBirth: a.date(),
      nationality: a.string(),
      walletAddress: a.string(),
      projectKYCs: a.hasMany("ProjectKYC", "userProfileId"),
      projects: a.hasMany("Project", "userProfileId")
    })
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.owner()
    ]),
  // RWA Projects
  Project: a
    .model({
      userProfileId: a.id().required(),
      userProfile: a.belongsTo("UserProfile", "userProfileId"),
      name: a.string().required(),
      type: a.string().required(), // "Commercial Real Estate", "Treasury Bond", "Gold Commodity", etc.
      location: a.string().required(), // Optional - not all assets have physical location
      value: a.string().required(),
      yieldRate: a.string(),
      occupancy: a.string(), // Only relevant for real estate
      tokensSold: a.string(),
      totalTokens: a.string(),
      tokenPrice: a.string().required(),
      previewImage: a.string(),
      images: a.string().array(),
      status: a.enum(["PREPARE", "ACTIVE", "LAUNCHING_SOON", "COMPLETED", "PAUSED", "CANCELLED"]),
      category: a.enum([
        // Real Estate
        "COMMERCIAL", "RESIDENTIAL", "MIXED_USE", "INDUSTRIAL", "RETAIL",
        // Financial Assets
        "TREASURY", "CORPORATE_BOND", "MUNICIPAL_BOND", "GOVERNMENT_BOND",
        // Commodities
        "PRECIOUS_METALS", "ENERGY", "AGRICULTURE", "INDUSTRIAL_METALS"
      ]),
      // Asset-specific fields (conditional based on asset type)
      yearBuilt: a.string(), // Real estate
      squareFootage: a.string(), // Real estate
      maturityDate: a.date(), // Bonds/Treasury
      couponRate: a.float(), // Bonds
      creditRating: a.string(), // Bonds
      commodityGrade: a.string(), // Commodities
      storageLocation: a.string(), // Physical commodities 
      
      // Smart Contract Integration
      smartContractId: a.string(), // Project ID on Smart Contract
      tokenAddress: a.string(), // RWA Token contract address
      primarySalesAddress: a.string(), // Primary Sales contract address
      vaultAddress: a.string(), // Vault contract address
      rfqAddress: a.string(), // RFQ contract address
      coordinatorAddress: a.string(), // Coordinator contract address
      network: a.string(), // Blockchain network (e.g., "avalanche-fuji")
      blockchainTxHash: a.string(), // Transaction hash of creation
      blockNumber: a.string(), // Block number where project was created
      deployedAt: a.datetime(), // When contracts were deployed
      
      // Asset-specific metadata for additional data
      assetMetadata: a.json(), // Flexible JSON for asset-specific data
      // KYC Requirements (varies by asset type and jurisdiction)
      kycRequirements: a.json(),
      requiredKycLevel: a.enum(["BASIC", "ENHANCED", "INSTITUTIONAL"]),
      jurisdiction: a.string(),
      regulatoryFramework: a.string(),
      minimumInvestment: a.string(),
      maximumInvestment: a.string(),
      investorRestrictions: a.string().array(),
      // Relationships
      documents: a.hasMany("ProjectDocument", "projectId"),
      projectKYCs: a.hasMany("ProjectKYC", "projectId")
    })
    .authorization((allow) => [ 
      allow.guest(),
      allow.authenticated()
    ]),
  // Project-specific KYC
  ProjectKYC: a
    .model({
      userProfileId: a.id().required(),
      userProfile: a.belongsTo("UserProfile", "userProfileId"),
      projectId: a.id().required(),
      project: a.belongsTo("Project", "projectId"),
      kycStatus: a.enum(["PENDING", "APPROVED", "REJECTED", "UNDER_REVIEW", "EXPIRED"]),
      kycLevel: a.enum(["BASIC", "ENHANCED", "INSTITUTIONAL"]),
      jurisdiction: a.string(), // e.g., "US", "EU", "UK"
      kycDocuments: a.string().array(),
      approvedAt: a.datetime(),
      expiresAt: a.datetime(),
      reviewedBy: a.string(),
      reviewNotes: a.string(),
      complianceScore: a.integer(),
      riskRating: a.enum(["LOW", "MEDIUM", "HIGH", "VERY_HIGH"])
    })
    .authorization((allow) => [
      allow.guest(),
      allow.authenticated()
    ]),
  // Project Documents
  ProjectDocument: a
    .model({
      projectId: a.id().required(),
      project: a.belongsTo("Project", "projectId"),
      name: a.string().required(),
      type: a.string().required(),
      url: a.string(),
      documentType: a.enum(["PROSPECTUS", "FINANCIAL", "LEGAL", "TECHNICAL", "COMPLIANCE"]),
      isPublic: a.boolean().default(false)
    }).authorization((allow) => [
      allow.guest().to(["read"]),
      allow.owner()
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool"
  },
});
