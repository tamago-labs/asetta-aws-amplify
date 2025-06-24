import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Chat: a.conversation({
    aiModel: a.ai.model("Claude 3.5 Sonnet"),
    systemPrompt: 'You are a helpful assistant',
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
      projectKYCs: a.hasMany("ProjectKYC", "userProfileId")
    })
    .authorization((allow) => [allow.owner()]),
  // RWA Projects
  Project: a
    .model({
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
      status: a.enum(["ACTIVE", "LAUNCHING_SOON", "COMPLETED", "PAUSED", "CANCELLED"]),
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
      smartContractId: a.string(), // ID on Smart Contract
      // Asset-specific metadata for smart contract
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
      allow.guest().to(["read"]),
      allow.owner()
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
    .authorization((allow) => [allow.owner()]),
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
