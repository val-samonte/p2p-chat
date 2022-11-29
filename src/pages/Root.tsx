import { userWalletAtom } from '@/atoms/userWalletAtom'
import { LoadingIndicator } from '@/components/LoadingIndicator'
import { trimAddress } from '@/utils/trimAddress'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import classNames from 'classnames'
import { useAtomValue } from 'jotai'
import { Suspense } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export function Root() {
  const { setVisible } = useWalletModal()
  const { publicKey, disconnect } = useAtomValue(userWalletAtom)

  return (
    <div className='fixed inset-0 overflow-x-hidden overflow-y-auto'>
      <div
        className={classNames(
          'lg:landscape:w-square w-full h-full',
          'mx-auto flex flex-col',
        )}
      >
        <nav className='flex-none'>
          <ul className='flex items-end py-2 px-5 gap-5'>
            <li className='mr-auto text-4xl font-bold'>pygmy</li>
            <li>
              <NavLink
                to='/buy'
                className={({ isActive }) =>
                  isActive ? 'underline' : undefined
                }
              >
                Buy
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/sell'
                className={({ isActive }) =>
                  isActive ? 'underline' : undefined
                }
              >
                Sell
              </NavLink>
            </li>
            <li>
              {!publicKey ? (
                <button onClick={() => setVisible(true)}>
                  Connect <span className='hidden sm:inline'>Wallet</span>
                </button>
              ) : (
                <button onClick={disconnect}>
                  {trimAddress(publicKey.toBase58())}
                </button>
              )}
            </li>
          </ul>
        </nav>
        <main className='flex-auto relative'>
          <Suspense fallback={<LoadingIndicator />}>
            <Outlet />
          </Suspense>
        </main>
        <footer className='flex-none flex items-center justify-center p-5'>
          <div className='flex items-center'>
            <img className='h-6 mr-3' src='./discord.svg' />
            Join Our Community
          </div>
        </footer>
      </div>
    </div>
  )
}
