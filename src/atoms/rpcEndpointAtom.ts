import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { clusterApiUrl } from '@solana/web3.js'
import { atom } from 'jotai'

export const rpcEndpointAtom = atom(
  import.meta.env.VITE_CLUSTER ?? clusterApiUrl(WalletAdapterNetwork.Devnet),
)
