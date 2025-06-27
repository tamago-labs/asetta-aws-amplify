import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, avalanche, avalancheFuji } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia, avalanche, avalancheFuji],
  connectors: [
    injected()
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [avalanche.id]: http(),
    [avalancheFuji.id]: http(),
  },
})