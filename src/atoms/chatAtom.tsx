import { atom } from 'jotai'
import { atomFamily } from 'jotai/utils'
import { DataConnection } from 'peerjs'

type ChatAtomAction = { type: 'add_connection'; connection: DataConnection }

export const peerConnections = atomFamily((pubkey: string) =>
  atom<DataConnection | null>(null),
)

export const chatAtom = atom(null, (get, set, action: ChatAtomAction) => {
  switch (action.type) {
    case 'add_connection': {
      console.log('Chat: connected to', action.connection.peer)
      // properly intialize new connection
      // listen to chat, store to chat atom
      break
    }
  }
})
