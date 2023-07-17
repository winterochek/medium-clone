import clsx from 'clsx'
import { HTMLProps } from 'react'

interface Props extends HTMLProps<HTMLImageElement> {
   classname?: string
}
export function Avatar({ classname, ...props }: Props) {
   return (
      <img
         {...props}
         className={clsx('rounded-full hover:cursor-pointer', classname)}
      />
   )
}
