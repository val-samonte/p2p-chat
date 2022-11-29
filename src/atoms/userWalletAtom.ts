import { atom } from 'jotai'
import { WalletContextState } from '@solana/wallet-adapter-react'

const baseUserWalletAtom = atom<
  Promise<WalletContextState> | WalletContextState
>(new Promise(() => {}) as Promise<WalletContextState>)

export const userWalletAtom = atom<
  Promise<WalletContextState>,
  WalletContextState
>(
  async (get) => {
    return get(baseUserWalletAtom)
  },
  (_, set, update) => {
    set(baseUserWalletAtom, update)
  },
)
