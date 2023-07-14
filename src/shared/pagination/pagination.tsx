import clsx from 'clsx'

type Props = {
   currentPage: number
   pagesCount: number
   action: (page: number) => void
}

export default function PaginationComponent({ currentPage, pagesCount, action }: Props) {
   const array = new Array(pagesCount).fill('page')
   const isActive = (page: number) => page === currentPage

   if (pagesCount === 1) return null
   return (
      <div className='flex flex-row items-center flex-wrap gap-[6px] sm:gap-2'>
         {array.map((_, i) => {
            const pageNumber = i + 1
            const active = isActive(pageNumber)
            return (
               <div
                  className={clsx(
                     'flex items-center text-xs justify-center p-[2px] border h-6 w-6 rounded hover:cursor-pointer select-none shadow',
                     'sm:text-sm sm:rounded-md sm:w-8 sm:h-8 sm:shadow-sm',
                     'md:shadow-md md:text-base md:w-9 md:h-9',
                     'lg:rounded-lg lg:shadow-lg lg:h-10 lg:w-10 lg:border-2 lg:text-lg',
                     !active &&
                        'border-green-500 text-green-500 bg-white hover:bg-green-500 hover:border-white hover:text-white',
                     active && 'border-white text-white bg-green-500 hover:cursor-auto'
                  )}
                  key={i}
                  onClick={() => action(pageNumber)}
               >
                  {pageNumber}
               </div>
            )
         })}
      </div>
   )
}
