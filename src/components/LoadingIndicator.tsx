import classNames from 'classnames'
import { ReactNode } from 'react'

export function LoadingIndicator({ children }: { children?: ReactNode }) {
  return (
    <div className='absolute inset-0 flex items-center justify-center'>
      <div className='animate-bounce mr-3 -ml-2'>
        <OnlineIndicator state={'loading'} />
      </div>
      <span>{children ?? 'Loading'}</span>
    </div>
  )
}

export function OnlineIndicator({
  state,
}: {
  state: 'offline' | 'loading' | 'online'
}) {
  return (
    <div
      className={classNames(
        'ml-2 w-3 h-3 transition-all inline-block',
        state === 'loading' && 'bg-current animate-spin rounded-none',
        state === 'online' && 'bg-green-500 h-3 w-3 rounded-full',
        state === 'offline' && 'bg-red-500 h-3 w-3 rounded-full',
      )}
    ></div>
  )
}
