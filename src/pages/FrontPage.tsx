import { CoinIconContainer } from '@/components/CoinIconContainer'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

export function FrontPage() {
  return (
    <div className='absolute inset-0 flex items-center justify-center portrait:flex-col gap-5 text-center'>
      <Link to='/buy'>
        <section
          className={classNames(
            'flex flex-col',
            'p-5 text-zinc-900 bg-zinc-100 rounded-2xl',
            'hover:scale-105 transition-all cursor-pointer',
          )}
        >
          <div className='flex items-center justify-center mb-5 gap-3'>
            <CoinIconContainer>
              <img className='' src='/phPeso.svg' />
            </CoinIconContainer>
            →
            <CoinIconContainer>
              <img className='' src='/solanaLogoMark.svg' />
            </CoinIconContainer>
          </div>
          <h2 className='text-xl'>
            I want to <span className='font-bold underline'>buy</span> Solana
            tokens
          </h2>
        </section>
      </Link>
      <Link to='/sell'>
        <section
          className={classNames(
            'flex flex-col',
            'p-5 text-zinc-900 bg-zinc-100 rounded-2xl',
            'hover:scale-105 transition-all cursor-pointer',
          )}
        >
          <div className='flex items-center justify-center mb-5 gap-3'>
            <CoinIconContainer>
              <img className='' src='/solanaLogoMark.svg' />
            </CoinIconContainer>
            →
            <CoinIconContainer>
              <img className='' src='/phPeso.svg' />
            </CoinIconContainer>
          </div>
          <h2 className='text-xl'>
            I want to <span className='font-bold underline'>sell</span> Solana
            tokens
          </h2>
        </section>
      </Link>
    </div>
  )
}
