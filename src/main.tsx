import '@solana/wallet-adapter-react-ui/styles.css'
import './index.css'

import { WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import React, { ReactNode, Suspense, useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { InitAtom } from './atoms/InitAtom'
import { Root } from './pages/Root'
import { ErrorPage } from './pages/ErrorPage'
import { FrontPage } from './pages/FrontPage'
import { BuyPage } from './pages/BuyPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <FrontPage />,
      },
      {
        path: '/buy',
        element: <BuyPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Main>
      <RouterProvider router={router} />
    </Main>
  </React.StrictMode>,
)

function Main({ children }: { children: ReactNode }) {
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [])

  return (
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <InitAtom />
        <Suspense fallback={<div>Loading</div>}>{children}</Suspense>
      </WalletModalProvider>
    </WalletProvider>
  )
}
