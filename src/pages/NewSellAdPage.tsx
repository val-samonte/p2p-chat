import { programAtom } from '@/atoms/programAtom'
import { userWalletAtom } from '@/atoms/userWalletAtom'
import { BN } from '@project-serum/anchor'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import classNames from 'classnames'
import { useAtomValue } from 'jotai'
import { FormEvent, useEffect, useReducer, useState } from 'react'

interface SellAdForm {
  available: string
  unitPrice: string
  minLimit: string
  maxLimit: string
}

type SellAdFormAction =
  | { type: 'input'; name: string; value: string; decimal?: number }
  | { type: 'blur'; name: string }

const formatNumber = (value: string) => {
  return value
    .trim()
    .replace(/\.$/, '') // trailing period
    .replace(/^0+/, '') // trailing zeroes
    .replace(/^\./, '0.') // leading period
}

function useSellAdForm() {
  return useReducer(
    (state: SellAdForm, action: SellAdFormAction) => {
      switch (action.type) {
        case 'input': {
          const decimalLen = action.decimal ? `{0,${action.decimal}}` : '*'
          if (
            new RegExp('^(\\d)*(\\.)?(\\d)' + decimalLen + '$').test(
              action.value,
            )
          ) {
            return {
              ...state,
              [action.name]: action.value,
            }
          }
        }
        case 'blur': {
          return {
            ...state,
            [action.name]: formatNumber((state as any)[action.name]),
          }
        }
      }

      return state
    },
    {
      available: '',
      unitPrice: '',
      minLimit: '',
      maxLimit: '',
    },
  )
}

export function NewSellAdPage() {
  const { publicKey } = useAtomValue(userWalletAtom)
  const { setVisible } = useWalletModal()
  const program = useAtomValue(programAtom)

  const [formState, dispatch] = useSellAdForm()
  const [balance, setBalance] = useState(0)
  const [loadingBalance, setLoadingBalance] = useState(true)

  useEffect(() => {
    if (publicKey) {
      setLoadingBalance(true)
      program.provider.connection.getBalance(publicKey).then((amount) => {
        setBalance(amount / LAMPORTS_PER_SOL)
        setLoadingBalance(false)
      })
    } else {
      setBalance(0)
    }
  }, [publicKey, program])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    window.scrollTo(0, 0)
  }

  if (!publicKey) {
    return (
      <div className='absolute inset-0 p-5 flex flex-col items-center justify-center'>
        <span className='mb-5'>Please connect your wallet to continue</span>
        <button
          onClick={() => setVisible(true)}
          className={classNames(
            'transition-all rounded-full',
            'px-5 py-1 hover:px-6 hover:py-2 hover:-m-1',
            'bg-zinc-100 text-zinc-900 hover:bg-zinc-50',
          )}
        >
          Connect Wallet
        </button>
      </div>
    )
  }

  return (
    <div className='px-5 flex flex-col gap-5 mb-5'>
      <h1 className='py-5 text-xl text-center'>Sell Tokens</h1>
      <div className='bg-zinc-100 text-zinc-900 rounded-2xl max-w-xl w-full mx-auto flex flex-col p-5'>
        <p className='flex items-center justify-center italic'>
          You&nbsp;<span className='hidden sm:inline'>currently</span>&nbsp;have
          {loadingBalance ? (
            <div className='animate-pulse rounded-xl bg-zinc-200 w-20 h-6 mx-2' />
          ) : (
            <>
              <img src='/solanaLogoMark.svg' className='h-4 w-4 mx-2' />
              <span className='font-bold'>{balance}</span>&nbsp;
            </>
          )}
          tokens
        </p>
        <hr className='border-zinc-200 border-dashed my-3' />
        <form className='w-full flex flex-col gap-5' onSubmit={onSubmit}>
          <div className='flex flex-col landscape:grid landscape:grid-cols-2 gap-5'>
            <label className='flex flex-col'>
              <div className='text-sm mb-1 flex justify-between'>
                <span>Amount</span>
                <button
                  type='button'
                  className='cursor-pointer underline'
                  onClick={() =>
                    !loadingBalance &&
                    dispatch({
                      type: 'input',
                      name: 'available',
                      value: balance - 0.01 + '',
                    })
                  }
                >
                  MAX
                </button>
              </div>
              <div className='flex'>
                <div className='flex items-center justify-center h-8 aspect-square bg-zinc-900 rounded-l-xl text-zinc-100'>
                  <img src='/solanaLogoMark.svg' className='h-4 w-4' />
                </div>
                <input
                  autoFocus
                  type='text'
                  placeholder='0.00'
                  className='text-right w-full px-2 py-1 bg-white rounded-r-xl'
                  value={formState.available}
                  onInput={(e) =>
                    dispatch({
                      type: 'input',
                      name: 'available',
                      value: (e.target as any).value,
                    })
                  }
                  onBlur={() => dispatch({ type: 'blur', name: 'available' })}
                />
              </div>
            </label>
            <label className='flex flex-col'>
              <span className='text-sm mb-1'>Price Per Token</span>
              <div className='flex'>
                <div className='flex items-center justify-center h-8 aspect-square bg-zinc-900 rounded-l-xl'>
                  <img src='/phPeso.svg' className='h-4 w-4' />
                </div>
                <input
                  type='text'
                  placeholder='0.00'
                  className='text-right w-full px-2 py-1 bg-white rounded-r-xl'
                  value={formState.unitPrice}
                  onInput={(e) =>
                    dispatch({
                      type: 'input',
                      name: 'unitPrice',
                      value: (e.target as any).value,
                      decimal: 2,
                    })
                  }
                  onBlur={() => dispatch({ type: 'blur', name: 'unitPrice' })}
                />
              </div>
            </label>
            <label className='flex flex-col'>
              <span className='text-sm mb-1'>Minimum Amount</span>
              <div className='flex'>
                <div className='flex items-center justify-center h-8 aspect-square bg-zinc-900 rounded-l-xl'>
                  <img src='/phPeso.svg' className='h-4 w-4' />
                </div>
                <input
                  type='text'
                  placeholder='0.00'
                  className='text-right w-full px-2 py-1 bg-white rounded-r-xl'
                  value={formState.minLimit}
                  onInput={(e) =>
                    dispatch({
                      type: 'input',
                      name: 'minLimit',
                      value: (e.target as any).value,
                      decimal: 2,
                    })
                  }
                  onBlur={() => dispatch({ type: 'blur', name: 'minLimit' })}
                />
              </div>
            </label>
            <label className='flex flex-col'>
              <span className='text-sm mb-1'>Maximum Amount</span>
              <div className='flex'>
                <div className='flex items-center justify-center h-8 aspect-square bg-zinc-900 rounded-l-xl'>
                  <img src='/phPeso.svg' className='h-4 w-4' />
                </div>
                <input
                  type='text'
                  placeholder='0.00'
                  className='text-right w-full px-2 py-1 bg-white rounded-r-xl'
                  value={formState.maxLimit}
                  onInput={(e) =>
                    dispatch({
                      type: 'input',
                      name: 'maxLimit',
                      value: (e.target as any).value,
                      decimal: 2,
                    })
                  }
                  onBlur={() => dispatch({ type: 'blur', name: 'maxLimit' })}
                />
              </div>
            </label>
          </div>
          <div className='col-span-2 flex flex-col'>
            <span className='text-sm mb-1'>Transfer Methods</span>
            <ul className='flex flex-wrap gap-3'>
              <li>
                <label
                  className={classNames(
                    'bg-white',
                    'flex items-center cursor-pointer px-3 py-1 rounded-full',
                  )}
                >
                  <input type='checkbox' />
                  <span className='ml-2'>GCash</span>
                </label>
              </li>
              <li>
                <label
                  className={classNames(
                    'bg-white',
                    'flex items-center cursor-pointer px-3 py-1 rounded-full',
                  )}
                >
                  <input type='checkbox' />
                  <span className='ml-2'>Union Bank</span>
                </label>
              </li>
            </ul>
          </div>
          <hr className='border-zinc-200 border-dashed' />
          <p className='italic text-center px-5'>
            By posting this ad, you have agreed to the community's&nbsp;
            <span className='underline'>terms</span>&nbsp;and have understood
            the &nbsp;
            <span className='underline'>risk of using</span>&nbsp;this protocol
          </p>
          <hr className='border-zinc-200 border-dashed' />
          <button
            type='submit'
            className={classNames(
              'transition-all rounded-full',
              'px-2 py-1 hover:px-3 hover:py-2 hover:-m-1',
              'text-zinc-100 bg-zinc-900 hover:bg-zinc-800',
            )}
          >
            Post Sell Ad
          </button>
        </form>
      </div>
    </div>
  )
}
