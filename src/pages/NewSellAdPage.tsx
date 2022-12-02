import classNames from 'classnames'

export function NewSellAdPage() {
  return (
    <div className='px-5 flex flex-col gap-5 mb-5'>
      <h1 className='py-5 text-xl text-center'>Sell Tokens</h1>
      <div className='bg-slate-100 text-zinc-900 rounded-2xl max-w-xl w-full mx-auto flex flex-col p-5'>
        <p className='flex items-center justify-center italic'>
          You currently have
          <img src='/solanaLogoMark.svg' className='h-4 w-4 mx-2' />
          <span className='font-bold'>1000</span>&nbsp;tokens
        </p>
        <hr className='border-zinc-200 border-dashed my-3' />
        <form className='w-full flex flex-col gap-5'>
          <div className='flex flex-col landscape:grid landscape:grid-cols-2 gap-5'>
            <label className='flex flex-col'>
              <div className='text-sm mb-1 flex justify-between'>
                <span>Amount</span>
                <button className='cursor-pointer underline'>MAX</button>
              </div>
              <div className='flex'>
                <div className='flex items-center justify-center h-8 aspect-square bg-zinc-900 rounded-l-xl'>
                  <img src='/solanaLogoMark.svg' className='h-4 w-4' />
                </div>
                <input
                  autoFocus
                  type='text'
                  placeholder='0.00'
                  className='text-right w-full px-2 py-1 bg-white rounded-r-xl'
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
            className={classNames(
              'transition-all rounded-full',
              'px-2 py-1 hover:px-3 hover:py-2 hover:-m-1',
              'text-slate-100 bg-zinc-900 hover:bg-zinc-800',
            )}
          >
            Post Sell Ad
          </button>
        </form>
      </div>
    </div>
  )
}
