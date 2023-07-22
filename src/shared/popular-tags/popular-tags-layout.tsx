import { ReactNode } from 'react'

export function PopularTagsLayout({
   isLoading,
   isSuccess,
   tagList,
   loadingUi,
   isError,
   error,
}: {
   isLoading: boolean
   isSuccess: boolean
   tagList: ReactNode
   loadingUi: ReactNode
   isError: boolean
   error: string
}) {
   return (
      <div className='w-full h-full'>
         {isLoading && loadingUi}
         {isError && (
            <h2 className='text-red-500 font-medium text-center md:text-base lg:text-lg'>
               {String(error)}
            </h2>
         )}
         {isSuccess && tagList}
      </div>
   )
}
