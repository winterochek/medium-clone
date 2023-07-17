import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
   title: string
   isRedirect?: boolean
   redirectPath?: string
   redirectTitle?: string
   children: ReactNode
}

export default function FormContainerComponent({
   title,
   isRedirect = false,
   redirectPath,
   redirectTitle,
   children,
}: Props) {
   return (
      <div className=' py-2 sm:py-4 mx-auto w-full flex flex-col h-full items-center'>
         <h1 className='text-2xl font-semibold text-center text-green-500 w-full mb-1'>{title}</h1>
         {isRedirect && (
            <Link to={redirectPath!}>
               <p className='text-sm font-normal w-full mb-1 text-center text-gray-500 hover:text-black hover:cursor-pointer'>
                  {redirectTitle}
               </p>
            </Link>
         )}
         <div className='flex flex-col w-full items-center justify-center'>{children}</div>
      </div>
   )
}
