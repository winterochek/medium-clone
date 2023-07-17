import { ReactNode } from 'react'

type Props = {
   children: ReactNode
   title: string
}
export function Label({ children, title }: Props) {
   return (
      <label className='flex flex-col items-start gap-1 w-full'>
         <span className='text-green-500 px-2'>{title}</span>
         {children}
      </label>
   )
}
