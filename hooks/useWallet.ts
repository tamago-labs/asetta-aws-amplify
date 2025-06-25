'use client';

import { useState, useEffect } from 'react';

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  chainId: number | null;
}

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    chainId: null,
  });

  const [isConnecting, setIsConnecting] = useState(false);

  // Check if wallet is already connected on component mount
  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    // if (typeof window !== 'undefined' && window.ethereum) {
    //   try {
    //     const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    //     if (accounts.length > 0) {
    //       const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    //       const balance = await window.ethereum.request({
    //         method: 'eth_getBalance',
    //         params: [accounts[0], 'latest'],
    //       });
          
    //       setWalletState({
    //         isConnected: true,
    //         address: accounts[0],
    //         balance: balance,
    //         chainId: parseInt(chainId, 16),
    //       });
    //     }
    //   } catch (error) {
    //     console.error('Error checking wallet connection:', error);
    //   }
    // }
  };

  const connectWallet = async () => {
    // if (typeof window === 'undefined' || !window.ethereum) {
    //   alert('MetaMask is not installed. Please install MetaMask to continue.');
    //   return;
    // }

    setIsConnecting(true);
    
    try {
      // const accounts = await window.ethereum.request({ 
      //   method: 'eth_requestAccounts' 
      // });
      
      // if (accounts.length > 0) {
      //   const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      //   const balance = await window.ethereum.request({
      //     method: 'eth_getBalance',
      //     params: [accounts[0], 'latest'],
      //   });
        
      //   setWalletState({
      //     isConnected: true,
      //     address: accounts[0],
      //     balance: balance,
      //     chainId: parseInt(chainId, 16),
      //   });
      // }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletState({
      isConnected: false,
      address: null,
      balance: null,
      chainId: null,
    });
  };

  const switchNetwork = async (targetChainId: number) => {
    // if (typeof window === 'undefined' || !window.ethereum) {
    //   return;
    // }

    try {
      // await window.ethereum.request({
      //   method: 'wallet_switchEthereumChain',
      //   params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      // });
    } catch (error: any) {
      // If the chain is not added to MetaMask, add it
      if (error.code === 4902) {
        // Add Avalanche Fuji Testnet (as mentioned in the hero section)
        if (targetChainId === 43113) {
          try {
            // await window.ethereum.request({
            //   method: 'wallet_addEthereumChain',
            //   params: [
            //     {
            //       chainId: '0xa869',
            //       chainName: 'Avalanche Fuji Testnet',
            //       nativeCurrency: {
            //         name: 'AVAX',
            //         symbol: 'AVAX',
            //         decimals: 18,
            //       },
            //       rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
            //       blockExplorerUrls: ['https://testnet.snowtrace.io/'],
            //     },
            //   ],
            // });
          } catch (addError) {
            console.error('Error adding network:', addError);
          }
        }
      }
    }
  };

  // Listen for account changes
  useEffect(() => {
    // if (typeof window !== 'undefined' && window.ethereum) {
    //   const handleAccountsChanged = (accounts: string[]) => {
    //     if (accounts.length > 0) {
    //       setWalletState(prev => ({
    //         ...prev,
    //         address: accounts[0],
    //       }));
    //     } else {
    //       disconnectWallet();
    //     }
    //   };

    //   const handleChainChanged = (chainId: string) => {
    //     setWalletState(prev => ({
    //       ...prev,
    //       chainId: parseInt(chainId, 16),
    //     }));
    //   };

    //   window.ethereum.on('accountsChanged', handleAccountsChanged);
    //   window.ethereum.on('chainChanged', handleChainChanged);

    //   return () => {
    //     window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    //     window.ethereum.removeListener('chainChanged', handleChainChanged);
    //   };
    // }
  }, []);

  const formatAddress = (address: string | null) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(38)}`;
  };

  const formatBalance = (balance: string | null) => {
    if (!balance) return '0';
    const balanceInEth = parseInt(balance, 16) / Math.pow(10, 18);
    return balanceInEth.toFixed(4);
  };

  return {
    ...walletState,
    isConnecting,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    formatAddress,
    formatBalance,
    checkWalletConnection,
  };
};