import { useWallet } from '@solana/wallet-adapter-react'
import { useAtom, useSetAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import { isNetworkOnlineAtom, p2pAtom } from './p2pAtom'
import { userWalletAtom } from './userWalletAtom'

export function InitAtom() {
  ///////////////////////////
  // USER WALLET ATOM
  ///////////////////////////

  const walletContextStateSerialized = useRef('')
  const walletContextState = useWallet()
  const setUserWalletContextState = useSetAtom(userWalletAtom)
  const [isNetworkOnline, setNetworkOnline] = useAtom(isNetworkOnlineAtom)
  const p2pSerialized = useRef('')
  const setP2p = useSetAtom(p2pAtom)

  useEffect(() => {
    const serialized = JSON.stringify({
      wallet: walletContextState.wallet?.readyState,
      publicKey: walletContextState.publicKey,
      connected: walletContextState.connected,
      connecting: walletContextState.connecting,
      disconnecting: walletContextState.disconnecting,
    })

    if (walletContextStateSerialized.current !== serialized) {
      walletContextStateSerialized.current = serialized
      setUserWalletContextState(walletContextState)
    }
  }, [walletContextState])

  ///////////////////////////
  // NETWORK CONNECTIVITY
  ///////////////////////////

  useEffect(() => {
    const online = () => {
      setNetworkOnline(true)
    }
    const offline = () => {
      setNetworkOnline(false)
    }
    window.addEventListener('online', online)
    window.addEventListener('offline', offline)

    return () => {
      window.removeEventListener('online', online)
      window.removeEventListener('offline', offline)
    }
  }, [])

  ///////////////////////////
  // P2P ATOM
  ///////////////////////////

  useEffect(() => {
    const key = walletContextState.publicKey?.toBase58() ?? ''
    const serialized = key + '_' + isNetworkOnline

    if (p2pSerialized.current !== serialized) {
      p2pSerialized.current = serialized

      if (key && isNetworkOnline) {
        setP2p({ type: 'init', key })
      } else {
        setP2p({ type: 'destroy' })
      }
    }
  }, [walletContextState, isNetworkOnline])

  return null
}
