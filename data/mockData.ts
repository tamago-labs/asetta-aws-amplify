// Updated mock data aligned with AWS Amplify backend schema

export const mockProjects = [
  {
    id: 1,
    userProfileId: 'admin001',
    name: 'Manhattan Prime Properties',
    type: 'Commercial Real Estate',
    location: 'New York, NY',
    value: '$24.5M',
    yieldRate: '7.2%',
    occupancy: '98%',
    tokensSold: '650000',
    totalTokens: '2450000',
    tokenPrice: '10.00',
    image: '🏢',
    previewImage: '🏢',
    images: [],
    status: 'Active',
    category: 'Commercial',
    yearBuilt: '2018',
    squareFootage: '485,000 sq ft',
    description: 'Class A office building in the heart of Manhattan\'s financial district. Prime location with stable tenancy and strong cash flow potential.',
    keyFeatures: [
      'Prime Midtown Manhattan location',
      'Class A office building',
      '98% occupancy rate',
      'Long-term stable tenants',
      'Modern amenities and infrastructure'
    ],
    financials: {
      monthlyRent: '$185,000',
      operatingExpenses: '$45,000',
      netOperatingIncome: '$140,000',
      capRate: '6.8%'
    },
    documents: [
      { name: 'Property Prospectus', type: 'PDF', size: '2.4 MB' },
      { name: 'Financial Statements', type: 'PDF', size: '1.8 MB' },
      { name: 'Legal Documentation', type: 'PDF', size: '3.1 MB' },
      { name: 'Token Terms', type: 'PDF', size: '890 KB' }
    ]
  },
  {
    id: 2,
    userProfileId: 'admin001',
    name: 'Austin Tech Hub',
    type: 'Mixed-Use Development',
    location: 'Austin, TX',
    value: '$18.3M',
    yieldRate: '8.1%',
    occupancy: '95%',
    tokensSold: '1200000',
    totalTokens: '1830000',
    tokenPrice: '10.00',
    image: '🏗️',
    previewImage: '🏗️',
    images: [],
    status: 'Active',
    category: 'Mixed-Use',
    yearBuilt: '2021',
    squareFootage: '275,000 sq ft',
    description: 'Modern mixed-use development in Austin\'s fastest-growing tech corridor. Combines office space with retail and residential units.',
    keyFeatures: [
      'Prime Austin tech corridor location',
      'Mixed-use development',
      'Growing tech tenant base',
      'Modern sustainable design',
      'Flexible space configurations'
    ],
    financials: {
      monthlyRent: '$125,000',
      operatingExpenses: '$28,000',
      netOperatingIncome: '$97,000',
      capRate: '7.8%'
    },
    documents: [
      { name: 'Development Prospectus', type: 'PDF', size: '3.2 MB' },
      { name: 'Financial Projections', type: 'PDF', size: '2.1 MB' },
      { name: 'Tenant Agreements', type: 'PDF', size: '1.9 MB' },
      { name: 'Token Structure', type: 'PDF', size: '750 KB' }
    ]
  },
  {
    id: 3,
    userProfileId: 'admin001',
    name: 'Miami Luxury Residences',
    type: 'Residential Complex',
    location: 'Miami, FL',
    value: '$31.2M',
    yieldRate: '6.8%',
    occupancy: '92%',
    tokensSold: '2100000',
    totalTokens: '3120000',
    tokenPrice: '10.00',
    image: '🏖️',
    previewImage: '🏖️',
    images: [],
    status: 'Active',
    category: 'Residential',
    yearBuilt: '2020',
    squareFootage: '420,000 sq ft',
    description: 'Luxury waterfront residential complex in Miami\'s prestigious Brickell district. Premium amenities and ocean views.',
    keyFeatures: [
      'Waterfront Brickell location',
      'Luxury residential units',
      'Premium amenities package',
      'Ocean and city views',
      'High-end tenant demographic'
    ],
    financials: {
      monthlyRent: '$215,000',
      operatingExpenses: '$65,000',
      netOperatingIncome: '$150,000',
      capRate: '6.5%'
    },
    documents: [
      { name: 'Residential Prospectus', type: 'PDF', size: '4.1 MB' },
      { name: 'Rental Analysis', type: 'PDF', size: '2.8 MB' },
      { name: 'Property Management', type: 'PDF', size: '1.6 MB' },
      { name: 'Investment Terms', type: 'PDF', size: '920 KB' }
    ]
  },
  {
    id: 4,
    userProfileId: 'admin002',
    name: 'Seattle Office Complex',
    type: 'Class A Office Building',
    location: 'Seattle, WA',
    value: '$42.1M',
    yieldRate: '7.8%',
    occupancy: '89%',
    tokensSold: '3800000',
    totalTokens: '4210000',
    tokenPrice: '10.00',
    image: '🌲',
    previewImage: '🌲',
    images: [],
    status: 'Active',
    category: 'Commercial',
    yearBuilt: '2019',
    squareFootage: '650,000 sq ft',
    description: 'Premium office complex in Seattle\'s South Lake Union district. Home to major tech companies and startups.',
    keyFeatures: [
      'South Lake Union location',
      'Class A office building',
      'Tech company tenants',
      'LEED Gold certified',
      'Transit-accessible location'
    ],
    financials: {
      monthlyRent: '$275,000',
      operatingExpenses: '$75,000',
      netOperatingIncome: '$200,000',
      capRate: '7.5%'
    },
    documents: [
      { name: 'Office Complex Prospectus', type: 'PDF', size: '3.8 MB' },
      { name: 'Tenant Portfolio', type: 'PDF', size: '2.2 MB' },
      { name: 'Sustainability Report', type: 'PDF', size: '1.4 MB' },
      { name: 'Lease Agreements', type: 'PDF', size: '2.1 MB' }
    ]
  },
  {
    id: 5,
    userProfileId: 'admin002',
    name: 'Denver Industrial Park',
    type: 'Industrial/Warehouse',
    location: 'Denver, CO',
    value: '$15.7M',
    yieldRate: '9.2%',
    occupancy: '100%',
    tokensSold: '900000',
    totalTokens: '1570000',
    tokenPrice: '10.00',
    image: '🏭',
    previewImage: '🏭',
    images: [],
    status: 'Active',
    category: 'Industrial',
    yearBuilt: '2017',
    squareFootage: '890,000 sq ft',
    description: 'Strategic industrial park near Denver International Airport. Multi-tenant warehouse and distribution facility.',
    keyFeatures: [
      'Airport proximity location',
      'Multi-tenant warehouse',
      'Distribution hub access',
      '100% occupancy rate',
      'Long-term lease agreements'
    ],
    financials: {
      monthlyRent: '$120,000',
      operatingExpenses: '$25,000',
      netOperatingIncome: '$95,000',
      capRate: '8.9%'
    },
    documents: [
      { name: 'Industrial Prospectus', type: 'PDF', size: '2.9 MB' },
      { name: 'Logistics Analysis', type: 'PDF', size: '1.7 MB' },
      { name: 'Tenant Profiles', type: 'PDF', size: '1.3 MB' },
      { name: 'Distribution Metrics', type: 'PDF', size: '680 KB' }
    ]
  },
  {
    id: 6,
    userProfileId: 'admin003',
    name: 'Chicago Retail Center',
    type: 'Retail Complex',
    location: 'Chicago, IL',
    value: '$28.9M',
    yieldRate: '6.5%',
    occupancy: '96%',
    tokensSold: '1500000',
    totalTokens: '2890000',
    tokenPrice: '10.00',
    image: '🛍️',
    previewImage: '🛍️',
    images: [],
    status: 'Launching Soon',
    category: 'Retail',
    yearBuilt: '2022',
    squareFootage: '380,000 sq ft',
    description: 'Modern retail complex in Chicago\'s vibrant Lincoln Park neighborhood. Mix of national brands and local retailers.',
    keyFeatures: [
      'Lincoln Park location',
      'National brand tenants',
      'Local retailer mix',
      'High foot traffic area',
      'Modern retail amenities'
    ],
    financials: {
      monthlyRent: '$160,000',
      operatingExpenses: '$42,000',
      netOperatingIncome: '$118,000',
      capRate: '6.2%'
    },
    documents: [
      { name: 'Retail Prospectus', type: 'PDF', size: '3.5 MB' },
      { name: 'Market Analysis', type: 'PDF', size: '2.4 MB' },
      { name: 'Retailer Portfolio', type: 'PDF', size: '1.8 MB' },
      { name: 'Launch Timeline', type: 'PDF', size: '850 KB' }
    ]
  }
];

export const getProjectById = (id: number) => {
  return mockProjects.find(project => project.id === id);
};