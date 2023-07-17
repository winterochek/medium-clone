import clsx from 'clsx'
import { HTMLProps, ReactNode } from 'react'

interface Props extends HTMLProps<HTMLButtonElement> {
   classname?: string
   children: ReactNode
   variant: 'outline' | 'green' | 'danger' | 'gray'
   type?: 'submit' | 'button' | 'reset'
}

export function Button({
   classname,
   children,
   type,
   variant = 'green',
   ...rest
}: Props) {
   return (
      <button
         type={type || 'button'}
         className={clsx(
            'shadow text-xs rounded px-2 py-1 hover:cursor-pointer transition ease-out hover:translate-y-[1px] disabled:translate-y-0 disabled:cursor-auto',
            'sm:text-sm sm:shadow-sm sm:rounded-md sm:px-4 sm:py-2',
            'md:text-base md:shadow-md',
            'lg:shadow-lg lg:rounded-lg lg:text-lg',
            variant === 'outline' &&
               'bg-white border md:border-2 border-green-500 text-green-500 hover:bg-white ',
            variant === 'danger' &&
               'bg-white border md:border-2 border-red-500 text-red-500 hover:bg-gray-200',
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
