import { ReactNode } from 'react'

export function LoadingIndicator({ children }: { children?: ReactNode }) {
  return (
    <div className='absolute inset-0 flex items-center justify-center'>
      <div className='animate-bounce mr-3'>
        <div className='w-3 h-3 bg-zinc-100 animate-spin'></div>
      </div>
      <span>{children ?? 'Loading'}</span>
    </div>
  )
}
