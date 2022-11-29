import { ReactNode } from 'react'

export function CoinIconContainer({ children }: { children: ReactNode }) {
  return (
    <div className='h-10 w-10 bg-zinc-900 p-2 flex items-center justify-center rounded-full'>
      {children}
    </div>
  )
}
