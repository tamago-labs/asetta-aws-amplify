'use client'

import { useReadContract, useReadContracts } from 'wagmi'
import { useState, useEffect } from 'react'
import { formatUnits } from 'viem'

// Contract addresses (Avalanche Fuji)
const COORDINATOR_ADDRESS = '0x3a45eE7f3A7e81624DDac9b413D5541a0934E263' as const
const CHAIN_ID = 43113 // Avalanche Fuji

// Known project 1 addresses from deployment
const PROJECT_1_ADDRESSES = {
  rwaToken: '0x6e1A4aB42b0032679B046A4096be33F91e0242a6',
  primarySales: '0x8748EB38570Fe2BddA671fE8f43a48EdB05C50E6',
  rfq: '0x3FCa33f2afCa36bD784809b2255a5A52f9Dd02Fb',
  vault: '0xf4623E171Aaae9f8E2d8F1e34aD60c6A0851B9db',
  creator: '0x27dDF44eC9E32343599F7B939e4c35c034f78076',
  isActive: true,
  createdAt: 1750653282
}

// Contract ABIs (simplified for the data we need)
const COORDINATOR_ABI = [
  {
    name: 'getProject',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'projectId', type: 'uint256' }],
    outputs: [
      {
        name: 'project',
        type: 'tuple',
        components: [
          { name: 'rwaToken', type: 'address' },
          { name: 'primarySales', type: 'address' },
          { name: 'rfq', type: 'address' },
          { name: 'vault', type: 'address' },
          { name: 'creator', type: 'address' },
          { name: 'isActive', type: 'bool' },
          { name: 'createdAt', type: 'uint256' }
        ]
      }
    ]
  }
] as const

const TOKEN_ABI = [
  {
    name: 'name',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'string' }]
  },
  {
    name: 'symbol',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'string' }]
  },
  {
    name: 'totalSupply',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint8' }]
  },
  {
    name: 'assetData',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple',
        components: [
          { name: 'assetType', type: 'string' },
          { name: 'description', type: 'string' },
          { name: 'totalValue', type: 'uint256' },
          { name: 'url', type: 'string' },
          { name: 'createdAt', type: 'uint256' }
        ]
      }
    ]
  },
  {
    name: 'projectWallet',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'address' }]
  },
  {
    name: 'projectAllocationPercent',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    name: 'getPricePerToken',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    name: 'getMarketCap',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    name: 'getAllocationDetails',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      { name: 'projectTokens', type: 'uint256' },
      { name: 'liquidityTokensTotal', type: 'uint256' },
      { name: 'percentToProject', type: 'uint256' }
    ]
  },
  {
    name: 'getAvailableLiquidityTokens',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  }
] as const

export interface RWAProjectData {
  rwaToken: string
  primarySales: string
  rfq: string
  vault: string
  creator: string
  isActive: boolean
  createdAt: bigint
}

export interface RWATokenData {
  name: string
  symbol: string
  totalSupply: bigint
  decimals: number
  assetData: {
    assetType: string
    description: string
    totalValue: bigint
    url: string
    createdAt: bigint
  }
  projectWallet: string
  projectAllocationPercent: bigint
  pricePerToken: bigint
  marketCap: bigint
  allocationDetails: {
    projectTokens: bigint
    liquidityTokensTotal: bigint
    percentToProject: bigint
  }
  availableLiquidityTokens: bigint
}

export interface FormattedRWAData {
  project: RWAProjectData | null
  token: RWATokenData | null
  formatted: {
    totalSupply: string
    pricePerToken: string
    marketCap: string
    projectTokens: string
    liquidityTokens: string
    availableLiquidity: string
    totalValueUSD: string
    createdAt: string
  } | null
  isLoading: boolean
  error: string | null
}

export function useRWAContract(projectId: number): FormattedRWAData {

  const [tokenAddress, setTokenAddress] = useState<string | null>(null)
  
  // For project ID 1, use known addresses, otherwise fetch from coordinator
  const useKnownData = projectId === 1
  
  // Get project info from coordinator (for verification or other projects)
  const { 
    data: projectData, 
    isLoading: projectLoading, 
    error: projectError 
  } = useReadContract({
    address: COORDINATOR_ADDRESS,
    abi: COORDINATOR_ABI,
    functionName: 'getProject',
    args: [BigInt(projectId)],
    chainId: CHAIN_ID,
    query: {
      enabled: !useKnownData // Only fetch if not using known data
    }
  })

  // Update token address when project data loads or use known address
  useEffect(() => {
    if (useKnownData) {
      setTokenAddress(PROJECT_1_ADDRESSES.rwaToken)
    } else if (projectData && projectData.rwaToken !== '0x0000000000000000000000000000000000000000') {
      setTokenAddress(projectData.rwaToken)
    }
  }, [projectData, useKnownData])

  // Get token data (multiple calls)
  const { 
    data: tokenData, 
    isLoading: tokenLoading, 
    error: tokenError 
  }: any = useReadContracts({
    contracts: tokenAddress ? [
      {
        address: tokenAddress as `0x${string}`,
        abi: TOKEN_ABI,
        functionName: 'name',
        chainId: CHAIN_ID,
      },
      {
        address: tokenAddress as `0x${string}`,
        abi: TOKEN_ABI,
        functionName: 'symbol',
        chainId: CHAIN_ID,
      },
      {
        address: tokenAddress as `0x${string}`,
        abi: TOKEN_ABI,
        functionName: 'totalSupply',
        chainId: CHAIN_ID,
      },
      {
        address: tokenAddress as `0x${string}`,
        abi: TOKEN_ABI,
        functionName: 'decimals',
        chainId: CHAIN_ID,
      },
      {
        address: tokenAddress as `0x${string}`,
        abi: TOKEN_ABI,
        functionName: 'assetData',
        chainId: CHAIN_ID,
      },
      {
        address: tokenAddress as `0x${string}`,
        abi: TOKEN_ABI,
        functionName: 'projectWallet',
        chainId: CHAIN_ID,
      },
      {
        address: tokenAddress as `0x${string}`,
        abi: TOKEN_ABI,
        functionName: 'projectAllocationPercent',
        chainId: CHAIN_ID,
      },
      {
        address: tokenAddress as `0x${string}`,
        abi: TOKEN_ABI,
        functionName: 'getPricePerToken',
        chainId: CHAIN_ID,
      },
      {
        address: tokenAddress as `0x${string}`,
        abi: TOKEN_ABI,
        functionName: 'getMarketCap',
        chainId: CHAIN_ID,
      },
      {
        address: tokenAddress as `0x${string}`,
        abi: TOKEN_ABI,
        functionName: 'getAllocationDetails',
        chainId: CHAIN_ID,
      },
      {
        address: tokenAddress as `0x${string}`,
        abi: TOKEN_ABI,
        functionName: 'getAvailableLiquidityTokens',
        chainId: CHAIN_ID,
      }
    ] : [],
  })
 

  // Process and format the data
  const processedData: any = {
    project: null,
    token: null,
    formatted: null,
    isLoading: (useKnownData ? false : projectLoading) || tokenLoading,
    error: projectError?.message || tokenError?.message || null
  }

  // Use known project data for project ID 1
  if (useKnownData) {
    processedData.project = {
      rwaToken: PROJECT_1_ADDRESSES.rwaToken,
      primarySales: PROJECT_1_ADDRESSES.primarySales,
      rfq: PROJECT_1_ADDRESSES.rfq,
      vault: PROJECT_1_ADDRESSES.vault,
      creator: PROJECT_1_ADDRESSES.creator,
      isActive: PROJECT_1_ADDRESSES.isActive,
      createdAt: BigInt(PROJECT_1_ADDRESSES.createdAt)
    }
  } else if (projectData) {
    processedData.project = projectData as RWAProjectData
  }

  if (tokenData && tokenAddress) {
    try {
      const [
        nameResult,
        symbolResult,
        totalSupplyResult,
        decimalsResult,
        assetDataResult,
        projectWalletResult,
        projectAllocationResult,
        pricePerTokenResult,
        marketCapResult,
        allocationDetailsResult,
        availableLiquidityResult
      ] = tokenData

      console.log("tokenData #2 ", tokenData)

      if (
        nameResult.status === 'success' &&
        symbolResult.status === 'success' &&
        totalSupplyResult.status === 'success' &&
        decimalsResult.status === 'success' &&
        // assetDataResult.status === 'success' &&
        projectWalletResult.status === 'success' &&
        projectAllocationResult.status === 'success' &&
        pricePerTokenResult.status === 'success' &&
        marketCapResult.status === 'success' &&
        allocationDetailsResult.status === 'success' &&
        availableLiquidityResult.status === 'success'
      ) {
        const decimals = decimalsResult.result
        
        processedData.token = {
          name: nameResult.result,
          symbol: symbolResult.result,
          totalSupply: totalSupplyResult.result,
          decimals,
          // assetData: assetDataResult.result,
          projectWallet: projectWalletResult.result,
          projectAllocationPercent: projectAllocationResult.result,
          pricePerToken: pricePerTokenResult.result,
          marketCap: marketCapResult.result,
          allocationDetails: allocationDetailsResult.result,
          availableLiquidityTokens: availableLiquidityResult.result
        }

        // Format values for display
        const totalSupplyFormatted = formatUnits(totalSupplyResult.result, decimals)
        const pricePerTokenFormatted = Number(formatUnits(pricePerTokenResult.result, 8)) / 1e18
        const marketCapFormatted = Number(formatUnits(marketCapResult.result, 8))
        // const totalValueFormatted = Number(formatUnits(assetDataResult.result.totalValue, 8))
        
        processedData.formatted = {
          totalSupply: Number(totalSupplyFormatted).toLocaleString(),
          pricePerToken: `$${pricePerTokenFormatted.toFixed(6)}`,
          marketCap: `$${marketCapFormatted.toLocaleString()}`,
          projectTokens: Number(formatUnits(allocationDetailsResult.result[0], decimals)).toLocaleString(),
          liquidityTokens: Number(formatUnits(allocationDetailsResult.result[1], decimals)).toLocaleString(),
          availableLiquidity: Number(formatUnits(availableLiquidityResult.result, decimals)).toLocaleString(),
          // totalValueUSD: `$${totalValueFormatted.toLocaleString()}`
        }
      }
    } catch (error) {
      processedData.error = `Error processing token data: ${error}`
    }
  }

  return processedData
}

// Helper function to get explorer links
export function getExplorerLink(address: string, type: 'address' | 'tx' = 'address'): string {
  const baseUrl = 'https://testnet.snowtrace.io'
  return `${baseUrl}/${type}/${address}`
}

// Helper function to format addresses
export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
