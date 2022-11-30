import { atom } from 'jotai'
import { Peer } from 'peerjs'

const myPeerIdAtom = atom<Peer | null>(null)

export const isNetworkOnlineAtom = atom(window.navigator.onLine)

export const isPeerOnline = atom((get) => {
  const peer = get(myPeerIdAtom)
  const isOnline = get(isNetworkOnlineAtom)
  return !isOnline ? 'offline' : peer ? 'online' : 'loading'
})

type P2pAtomAction = { type: 'init'; key: string } | { type: 'destroy' }

export const p2pAtom = atom(null, async (get, set, action: P2pAtomAction) => {
  console.log('P2P:', action.type)
  switch (action.type) {
    case 'init': {
      // todo: add cluster endpoint to id
      let iter = 0
      let peer: Peer | null = null
      while (!peer) {
        peer = await new Promise<Peer | null>((resolve) => {
          const id = `pygmy_${action.key}_${iter}`
          const newPeer = new Peer(id)

          newPeer.on('error', (err) => {
            resolve(null)
          })

          newPeer.on('open', () => {
            console.log('P2P: connected as', id)
            resolve(newPeer)
          })
        })

        iter++
      }
      peer.off('error')
      peer.on('error', () => {
        set(p2pAtom, { type: 'destroy' })
      })

      set(myPeerIdAtom, peer)
      break
    }
    case 'destroy': {
      const peer = get(myPeerIdAtom)
      if (peer) {
        if (!peer.destroyed) {
          peer.destroy()
        }
        set(myPeerIdAtom, null)
      }
      break
    }
  }
})
