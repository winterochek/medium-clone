import { Button } from '../ui'

export function ErrorFallback() {
   const handleRefresh = () => window.location.reload()
   return (
      <div className='fixed inset-0 z-50 bg-gray-50 flex flex-col items-center justify-center'>
         <div className='flex flex-col gap-4'>
            <h3 className='text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-red-500'>
               Something went wrong. Please, refresh the page
            </h3>
            <Button
               onClick={handleRefresh}
               onKeyDown={(event: React.KeyboardEvent<HTMLButtonElement>) => {
                  if (event.code !== 'enter') return
                  handleRefresh()
               }}
               variant='green'
               classname='ml-auto'
            >
               refresh
            </Button>
         </div>
      </div>
   )
}
