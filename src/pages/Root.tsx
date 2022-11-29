import { userWalletAtom } from '@/atoms/userWalletAtom'
import { trimAddress } from '@/utils/trimAddress'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import classNames from 'classnames'
import { useAtomValue } from 'jotai'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

export function Root() {
  const { setVisible } = useWalletModal()
  const { publicKey, disconnect } = useAtomValue(userWalletAtom)

  return (
    <div className='fixed inset-0 overflow-x-hidden overflow-y-auto'>
      <main
        className={classNames(
          'landscape:w-square portrait:w-full h-full',
          'mx-auto flex flex-col',
        )}
      >
        <nav>
          <ul className='flex items-end py-2 px-3'>
            <li className='mr-auto text-4xl font-bold'>pygmy</li>
            <li>
              {!publicKey ? (
                <button onClick={() => setVisible(true)}>Connect Wallet</button>
              ) : (
                <button onClick={disconnect}>
                  {trimAddress(publicKey.toBase58())}
                </button>
              )}
            </li>
          </ul>
        </nav>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}
