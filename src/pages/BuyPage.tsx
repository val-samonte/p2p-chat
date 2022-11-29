export function BuyPage() {
  return (
    <div className='lg:py-10 px-5 flex flex-col gap-5'>
      <ul className='flex items-center gap-3 flex-wrap'>
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
        <li className='p-5 bg-slate-100 text-zinc-900 rounded-2xl grid grid-cols-5 items-center'>
          <div className='flex flex-col'>
            <div className='flex items-center'>
              <span className='underline'>Dt29...wzHC</span>
              <span className='bg-green-500 ml-2 h-3 w-3 rounded-full inline-block'></span>
            </div>
            <div className='flex items-center'>
              <img src='/discord_black.svg' className='h-4 w-4 mr-2' />
              Profile
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex items-center'>
              <span className='font-bold text-2xl'>800.00</span>
              <span className='ml-2'>PHP</span>
            </div>
          </div>
          <div className='flex flex-col col-span-2'>
            <div className='flex items-center'>
              <span>Available</span>
              <span className='flex-auto border-b border-b-zinc-300 border-dashed mx-5' />
              <span className='flex items-center justify-end'>
                <img src='/solanaLogoMark.svg' className='h-4 w-4 mr-2' />
                <span className='font-bold'>375.00</span>
              </span>
            </div>
            <div className='flex items-center'>
              <span>Limit</span>
              <span className='flex-auto border-b border-b-zinc-300 border-dashed mx-5' />
              <span className='flex items-center justify-end'>
                <span className='font-bold'>200,000.00</span>
                <span className='mx-2'>-</span>
                <span className='font-bold'>300,000.00</span>
                <span className='ml-2'>PHP</span>
              </span>
            </div>
          </div>
          <div className='flex items-center justify-end'>
            <ul className='flex flex-wrap gap-2 text-sm justify-end'>
              <li className='bg-blue-300 px-2 py-1 rounded-xl'>GCash</li>
              <li className='bg-orange-300 px-2 py-1 rounded-xl'>Union Bank</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  )
}
