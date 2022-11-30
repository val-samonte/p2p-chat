import { OnlineIndicator } from './LoadingIndicator'

export function SellerCard() {
  return (
    <li className='gap-3 cursor-pointer transition-all p-5 hover:p-7 hover:-m-2 bg-slate-100 text-zinc-900 rounded-2xl grid grid-cols-2 md:grid-cols-5 items-center'>
      <div className='flex flex-col'>
        <div className='flex items-center'>
          <span className='underline'>Dt29...wzHC</span>
          <OnlineIndicator state={'online'} />
        </div>
        <div className='flex items-center'>
          <img src='/discord_black.svg' className='h-4 w-4 mr-2' />
          Profile
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='flex items-center justify-end md:justify-center'>
          <span className='font-bold text-2xl'>800.00</span>
          <span className='ml-2'>PHP</span>
        </div>
      </div>
      <div className='flex flex-col col-span-2'>
        <div className='flex items-center'>
          <span>Available</span>
          <span className='flex-auto border-b border-b-zinc-200 border-dashed mx-2 lg:mx-5' />
          <span className='flex items-center justify-end'>
            <img src='/solanaLogoMark.svg' className='h-4 w-4 mr-2' />
            <span className='font-bold'>375.00</span>
          </span>
        </div>
        <div className='flex items-center'>
          <span>Limit</span>
          <span className='flex-auto border-b border-b-zinc-200 border-dashed mx-2 lg:mx-5' />
          <span className='flex items-center justify-end'>
            <span className='font-bold'>200,000.00</span>
            <span className='mx-2'>-</span>
            <span className='font-bold'>300,000.00</span>
            <span className='ml-2'>PHP</span>
          </span>
        </div>
      </div>
      <div className='flex items-center justify-end col-span-2 md:col-span-1'>
        <ul className='flex flex-wrap gap-2 text-xs justify-end'>
          <li className='bg-blue-300 px-2 py-1 rounded-xl'>GCash</li>
          <li className='bg-orange-300 px-2 py-1 rounded-xl'>Union Bank</li>
        </ul>
      </div>
    </li>
  )
}
