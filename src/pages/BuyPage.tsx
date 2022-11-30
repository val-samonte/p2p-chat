import { SellerCard } from '@/components/SellerCard'

export function BuyPage() {
  return (
    <div className='px-5 flex flex-col gap-5'>
      <ul className='py-5 md:pt-10 md:pb-0 flex items-center gap-3 flex-wrap'>
        <li>Buy </li>
        <li className='bg-slate-100 text-zinc-900 px-2 py-1 rounded-xl flex items-center'>
          <img src='/solanaLogoMark.svg' className='h-4 w-4 mr-2' />
          SOL
        </li>
        <li className='bg-slate-100 text-zinc-900 px-2 py-1 rounded-xl opacity-20'>
          USDC (Soon)
        </li>
        <li>with amount of</li>
        <li>
          <input
            autoFocus
            type='text'
            placeholder='Enter amount'
            className='bg-slate-100 text-zinc-900 px-3 py-1 rounded-xl w-32'
          />
        </li>
        <li>in PHP</li>
      </ul>
      <ul className='flex flex-col gap-5'>
        <SellerCard />
      </ul>
    </div>
  )
}
