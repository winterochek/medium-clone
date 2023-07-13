import clsx from 'clsx'
import { HTMLProps, ReactNode } from 'react'

interface Props extends HTMLProps<HTMLButtonElement> {
   classname?: string
   children: ReactNode
   variant?: 'outline' | 'green' | 'danger' | 'gray'
   type?: 'submit' | 'button' | 'reset'
}

export default function ButtonComponent({ classname, children, type, variant, ...rest }: Props) {
   return (
      <button
         type={type || 'button'}
         className={clsx(
            'shadow-md rounded-md px-4 py-2  hover:cursor-pointer  transition ease-out hover:translate-y-[1px] disabled:translate-y-0 disabled:cursor-auto',
            variant === 'outline' &&
               'bg-white border-2 border-green-500 text-green-500 hover:bg-white ',
            variant === 'danger' && 'bg-white border-2 border-red-500 text-red-500 hover:bg-gray-200',
            variant === 'green' && 'text-white bg-green-500 hover:bg-green-600',
            variant === 'gray' && 'bg-gray-400 border-gray-500 text-white hover:bg-gray-500',
            classname
         )}
         {...rest}
      >
         {children}
      </button>
   )
}
