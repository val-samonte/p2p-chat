export function ErrorPage() {
  return (
    <div className='fixed inset-0 bg-zinc-900 flex flex-col items-center justify-center text-center'>
      <h1 className='text-2xl mb-3'>Something went wrong</h1>
      <p className='text-zinc-300'>
        Please{' '}
        <a href='/' className='underline'>
          refresh the page
        </a>{' '}
        and try again
      </p>
    </div>
  )
}
