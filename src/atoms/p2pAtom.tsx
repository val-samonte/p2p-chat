import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes'
import { Keypair, PublicKey } from '@solana/web3.js'
import { atom } from 'jotai'
import { atomFamily } from 'jotai/utils'
import { DataConnection, Peer } from 'peerjs'
import nacl from 'tweetnacl'
import { getRandom } from '@/utils/encryption'
import { userWalletAtom } from './userWalletAtom'

const myPeerAtom = atom<Peer | null>(null)

const myDevicePubkeyAtom = atomFamily((pubkey: string) =>
  atom<string>(() => {
    const storeId = `device_key_${pubkey}`

    // todo: encrypt keypair using password, store password in session
    const existingDeviceKey = window.localStorage.getItem(storeId)

    let keypair: Keypair

    if (existingDeviceKey) {
      keypair = Keypair.fromSecretKey(bs58.decode(existingDeviceKey))
    } else {
      keypair = Keypair.generate()
      window.localStorage.setItem(storeId, bs58.encode(keypair.secretKey))
    }

    return keypair.publicKey.toBase58()
  }),
)

const peerConnections = atomFamily((pubkey: string) =>
  atom<DataConnection | null>(null),
)

export const isNetworkOnlineAtom = atom(window.navigator.onLine)

export const myOnlineStateAtom = atom((get) => {
  const myPeer = get(myPeerAtom)
  const isOnline = get(isNetworkOnlineAtom)
  return !isOnline ? 'offline' : myPeer ? 'online' : 'loading'
})

type ConnectionMessage =
  | { type: 'verify'; message: string } // ask peer to verify his / her identity
  | { type: 'verification'; message: string } // answer with verification

interface ConnectionOnData {
  nonce: string
  myPubkey: string
  targetDevicePubkey: string
  verifyCallback: (signature: string) => void
  verificationCallback: (verifyResult: boolean) => void
}

const connectionOnData =
  ({
    nonce,
    myPubkey,
    targetDevicePubkey,
    verifyCallback,
    verificationCallback,
  }: ConnectionOnData) =>
  (data: unknown) => {
    try {
      const payload = data as ConnectionMessage
      switch (payload.type) {
        case 'verify': {
          const deviceKey = window.localStorage.getItem(
            `device_key_${myPubkey}`,
          )
          if (!deviceKey) return

          const keypair = Keypair.fromSecretKey(bs58.decode(deviceKey))
          const message = new TextEncoder().encode(payload.message)
          const signature = bs58.encode(
            nacl.sign.detached(message, keypair.secretKey),
          )

          verifyCallback(signature)
          break
        }
        case 'verification': {
          if (!payload.message) return

          const message = new TextEncoder().encode(nonce)
          const signature = bs58.decode(payload.message)
          const pubkey = new PublicKey(targetDevicePubkey).toBytes()

          verificationCallback(
            nacl.sign.detached.verify(message, signature, pubkey),
          )
          break
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

type P2pAtomAction =
  | { type: 'init'; key: string }
  | { type: 'destroy' }
  | { type: 'connect'; key: string }

export const p2pAtom = atom(null, async (get, set, action: P2pAtomAction) => {
  console.log('P2P:', action.type)

  switch (action.type) {
    case 'init': {
      const devicePubkey = get(myDevicePubkeyAtom(action.key))

      // todo: add cluster endpoint to id
      let slot = 0
      let peer: Peer | null = null

      while (!peer && slot < 10) {
        console.log('P2P: checking slot', slot)
        peer = await new Promise<Peer | null>((resolve) => {
          const id = `pygmy_${devicePubkey}_${slot}`
          const newPeer = new Peer(id)

          newPeer.on('error', (err) => {
            if ((err as any).type === 'unavailable-id') {
              slot++
              resolve(null)
            } else {
              // delay and try again
              setTimeout(() => resolve(null), 5000)
            }
          })

          newPeer.on('open', () => {
            console.log('P2P: connected as', id)
            resolve(newPeer)
          })
        })
      }

      // todo: proper way to handle id unavailability
      if (!peer) return

      peer.off('error')
      peer.on('error', (err) => {
        console.log(JSON.stringify(err))
        set(p2pAtom, { type: 'destroy' })
      })

      peer.on('connection', (conn) => {
        console.log('P2P: receiving connection', conn)
        const nonce = getRandom()

        conn.on(
          'data',
          connectionOnData({
            nonce,
            myPubkey: action.key,
            targetDevicePubkey: conn.peer.split('_')[1],
            verifyCallback: (signature) => {
              conn.send({ type: 'verification', message: signature })
            },
            verificationCallback: (result) => {
              // todo
            },
          }),
        )

        // challenge connector
        conn.send({ type: 'verify', message: nonce })
      })

      set(myPeerAtom, peer)
      break
    }

    case 'destroy': {
      const peer = get(myPeerAtom)
      if (peer) {
        if (!peer.destroyed) {
          peer.destroy()
        }
        set(myPeerAtom, null)
      }
      break
    }

    case 'connect': {
      const peer = get(myPeerAtom)
      if (!peer) return

      // todo: check if connecting to the same device
      const { publicKey: myPubkey } = get(userWalletAtom)
      if (!myPubkey) return

      let slot = 0
      let conn: DataConnection | null = null

      while (!conn && slot < 10) {
        conn = await new Promise<DataConnection | null>((resolve) => {
          // expire connection attempt after 5 seconds
          const expireId = window.setTimeout(() => {
            resolve(null)
          }, 5000)

          const hostId = `pygmy_${action.key}_${slot}`
          const nonce = getRandom()

          console.log('P2P: connecting to', hostId, nonce)
          const newConn = peer.connect(hostId)

          newConn.on('error', () => {
            const conn = get(peerConnections(action.key))
            if (conn) {
              conn.close()
              set(peerConnections(action.key), null)
              peerConnections.remove(action.key)
            }
            clearTimeout(expireId)
            resolve(null)
          })

          newConn.on(
            'data',
            connectionOnData({
              nonce,
              myPubkey: myPubkey.toBase58(),
              targetDevicePubkey: action.key,
              verifyCallback: (signature) => {
                // todo
              },
              verificationCallback: (result) => {
                if (result) {
                  clearTimeout(expireId)
                  resolve(newConn)
                }
              },
            }),
          )

          newConn.on('open', () => {
            // challenge peer connection
            newConn.send({ type: 'verify', message: nonce })
          })
        })

        slot++
      }

      if (!conn) return

      // conn.off('open')
      // conn.off('data')
      console.log('P2P: connected to', conn.peer)

      // todo: add to connection list (peerConnections)

      break
    }
  }
})
