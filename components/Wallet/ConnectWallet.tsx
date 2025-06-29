'use client'

import { useAccount, useConnect, useDisconnect, useEnsName, useBalance, useSwitchChain } from 'wagmi'
import { Wallet, LogOut, Copy, ExternalLink, AlertTriangle, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { avalanche, avalancheFuji } from 'wagmi/chains'

interface ConnectWalletProps {
  projectData?: any
}

export function ConnectWallet({ projectData }: ConnectWalletProps) {
  const { address, isConnected, chain } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { data: balance } = useBalance({ address })
  const { connect, connectors, error } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()
  const [showDropdown, setShowDropdown] = useState(false)


  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const formatBalance = (balance: any) => {
    if (!balance) return '0'
    const value = parseFloat(balance.formatted)
    if (value < 0.001) return '< 0.001'
    return value.toFixed(4)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const openInExplorer = () => {
    if (!address || !chain) return
    
    let explorerUrl = ''
    switch (chain.id) {
      case 1: // Mainnet
        explorerUrl = `https://etherscan.io/address/${address}`
        break
      case 11155111: // Sepolia
        explorerUrl = `https://sepolia.etherscan.io/address/${address}`
        break
      case 43114: // Avalanche
        explorerUrl = `https://snowtrace.io/address/${address}`
        break
      case 43113: // Avalanche Fuji
        explorerUrl = `https://testnet.snowtrace.io/address/${address}`
        break
      default:
        explorerUrl = `https://etherscan.io/address/${address}`
    }
    
    window.open(explorerUrl, '_blank')
  }

  // Check if we're on the correct network for this project
  const getRequiredNetwork = () => {
    if (projectData?.network === 'avalanche-fuji') return avalancheFuji
    if (projectData?.network === 'avalanche') return avalanche
    return avalancheFuji // Default
  }

  const requiredNetwork = getRequiredNetwork()
  const isCorrectNetwork = chain?.id === requiredNetwork.id

  const handleNetworkSwitch = () => {
    switchChain({ chainId: requiredNetwork.id })
  }

  if (isConnected && address) {
    return (
      <div className="space-y-4">
        {/* Network Warning */}
        {!isCorrectNetwork && (
          <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertTriangle size={16} className="text-amber-600" />
            <div className="flex-1">
              <div className="text-sm font-medium text-amber-800">Wrong Network</div>
              <div className="text-xs text-amber-700">
                Switch to {requiredNetwork.name} to invest in this project
              </div>
            </div>
            <button
              onClick={handleNetworkSwitch}
              className="px-3 py-1 bg-amber-600 text-white text-xs rounded hover:bg-amber-700 transition-colors"
            >
              Switch Network
            </button>
          </div>
        )}

        {/* Connected Status */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 w-full px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-sm font-light"
          >
            <div className={`w-2 h-2 rounded-full ${isCorrectNetwork ? 'bg-green-500' : 'bg-amber-500'}`}></div>
            <div className="flex-1 text-left">
              <div className="font-medium">{ensName || formatAddress(address)}</div>
              <div className="text-xs text-gray-500">
                {formatBalance(balance)} {balance?.symbol} • {chain?.name}
              </div>
            </div>
          </button>

          {showDropdown && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-4 border-b border-gray-100">
                <div className="text-sm font-light text-gray-600 mb-1">Connected Wallet</div>
                <div className="font-mono text-xs text-gray-800 break-all">{address}</div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-gray-500">
                    {formatBalance(balance)} {balance?.symbol}
                  </div>
                  <div className="text-xs text-gray-500">{chain?.name}</div>
                </div>
              </div>
              
              <div className="p-2">
                <button
                  onClick={() => copyToClipboard(address)}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                >
                  <Copy size={14} />
                  Copy Address
                </button>
                
                <button
                  onClick={openInExplorer}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                >
                  <ExternalLink size={14} />
                  View in Explorer
                </button>
                
                <hr className="my-2" />
                
                <button
                  onClick={() => disconnect()}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                >
                  <LogOut size={14} />
                  Disconnect
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Investment Ready Status */}
        {isCorrectNetwork && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle size={16} className="text-green-600" />
            <div className="text-sm text-green-800">
              Ready to invest in {projectData?.name || 'this project'}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="text-sm font-light text-gray-600 mb-3">
        Connect your wallet to invest in {projectData?.name || 'this project'}
      </div>
      
      {/* Project Network Info */}
      {projectData?.network && (
        <div className="text-xs text-gray-500 mb-3 p-2 bg-gray-50 rounded">
          This project is deployed on <strong>{requiredNetwork.name}</strong>
        </div>
      )}
      
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })} 
          className="flex items-center gap-3 w-full px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-colors text-sm font-light disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Wallet size={16} />
          <span>
            {connector.name} 
          </span>
        </button>
      ))}

      {error && (
        <div className="text-red-600 text-sm font-light mt-2 p-3 bg-red-50 rounded border border-red-200">
          {error.message}
        </div>
      )}
    </div>
  )
}