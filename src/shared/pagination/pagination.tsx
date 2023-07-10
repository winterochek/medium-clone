import clsx from 'clsx'

type Props = {
   currentPage: number
   pagesCount: number
   action: (page: number) => void
}

export default function PaginationComponent({ currentPage, pagesCount, action }: Props) {
   const array = new Array(pagesCount).fill('page')
   const isActive = (page: number) => page === currentPage
   return (
      <div className='flex flex-row items-center justify-start gap-2'>
         {array.map((_, i) => {
            const pageNumber = i + 1
            const active = isActive(pageNumber)
            return (
               <div
                  className={clsx(
                     'flex items-center justify-center p-1 border w-8 h-8 hover:cursor-pointer select-none shadow-md',
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
