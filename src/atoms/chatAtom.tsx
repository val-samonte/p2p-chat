import { atom } from 'jotai'
import { atomFamily } from 'jotai/utils'
import { DataConnection } from 'peerjs'

type ConnectionAtomAction = {
  type: 'add'
  connection: DataConnection
}

type MessagePayload =
  | { type: 'text'; message: string }
  | { type: 'image'; message: string }
  | { type: 'ring' }
  | { type: 'answer_ring' }
  | { type: 'signature_request' }

export const peerConnections = atomFamily((pubkey: string) =>
  atom<DataConnection | null>(null),
)

export const chatAtom = atomFamily((pubkey: string) => atom([]))

export const connectionAtom = atom(
  null,
  (get, set, action: ConnectionAtomAction) => {
    switch (action.type) {
      case 'add': {
        console.log('Chat: connected to', action.connection.peer)
        const connection = action.connection
        const deviceKey = connection.peer.split('_')[1]

        connection.on('close', () => {
          peerConnections.remove(deviceKey)
        })

        connection.on('data', (data) => {
          const payload = data as MessagePayload

          switch (payload.type) {
            case 'text': {
              break
            }
            case 'image': {
              break
            }
            case 'ring': {
              break
            }
            case 'answer_ring': {
              break
            }
            case 'signature_request': {
              break
            }
          }
        })

        set(peerConnections(deviceKey), connection)

        break
      }
    }
  },
)
