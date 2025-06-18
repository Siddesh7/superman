import { privateKeyToAccount } from 'viem/accounts'
import { http, createConfig } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'

export const wagmiConfig = createConfig({
    chains: [base, baseSepolia],
    transports: {
        [base.id]: http(),
        [baseSepolia.id]: http(),
    },
})

export const AgentWallet = '0x0ae530b94Cc0ED6baBf091bF201d7DBcdB153029'; 