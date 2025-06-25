'use client';

import { Wallet } from 'lucide-react';

interface WalletButtonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
}

export default function WalletButton({ 
  className = '', 
  size = 'md',
  variant = 'primary'
}: WalletButtonProps) {
  // Simple wallet connection state for now
  const isConnected = false;
  const address = null;
  const isConnecting = false;

  const handleConnect = () => {
    // Simple wallet connection logic
    console.log('Connecting wallet...');
  };

  const handleDisconnect = () => {
    console.log('Disconnecting wallet...');
  };

  const formatAddress = (addr: string | null) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(38)}`;
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const variantClasses = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-white text-black border border-gray-300 hover:bg-gray-50'
  };

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          Connected: {formatAddress(address)}
        </div>
        <button
          onClick={handleDisconnect}
          className="text-sm text-red-600 hover:text-red-700 px-2 py-1 hover:bg-red-50 rounded transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={handleConnect}
      disabled={isConnecting}
      className={`
        flex items-center gap-2 font-light transition-colors disabled:opacity-50
        ${sizeClasses[size]} 
        ${variantClasses[variant]}
        ${className}
      `}
    >
      <Wallet className="w-4 h-4" />
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}