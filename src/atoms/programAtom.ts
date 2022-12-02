import { atom } from 'jotai'
import { AnchorProvider, Program } from '@project-serum/anchor'
import { AnchorWallet } from '@solana/wallet-adapter-react'
import { Keypair, PublicKey, Transaction } from '@solana/web3.js'
import { P2pTradeFacilitatorProgram } from '@/types/p2p_trade_facilitator_program'
import idl from '@/idl/p2p_trade_facilitator_program.json'
import { anchorWalletAtom } from './anchorWalletAtom'
import { connectionAtom } from './connectionAtom'

export class KeypairWallet implements AnchorWallet {
  constructor(readonly payer: Keypair) {}

  async signTransaction(tx: Transaction): Promise<Transaction> {
    tx.partialSign(this.payer)
    return tx
  }

  async signAllTransactions(txs: Transaction[]): Promise<Transaction[]> {
    return txs.map((tx) => {
      tx.partialSign(this.payer)
      return tx
    })
  }

  get publicKey(): PublicKey {
    return this.payer.publicKey
  }
}

export const programAtom = atom((get) => {
  const wallet = get(anchorWalletAtom)
  const connection = get(connectionAtom)
  const dummyWallet = new KeypairWallet(Keypair.generate())

  const provider = new AnchorProvider(
    connection,
    wallet ?? dummyWallet,
    AnchorProvider.defaultOptions(),
  )

  return new Program<P2pTradeFacilitatorProgram>(
    idl as unknown as P2pTradeFacilitatorProgram,
    import.meta.env.VITE_PROGRAM_ID ?? idl.metadata.address,
    provider,
  )
})
