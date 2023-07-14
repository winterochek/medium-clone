import clsx from 'clsx'
import { HTMLProps } from 'react'

interface Props extends HTMLProps<HTMLImageElement> {
   classname?: string
}
export default function AvatarComponent({ classname, ...props }: Props) {
   return (
      <img
         {...props}
         className={clsx('rounded-full hover:cursor-pointer', classname)}
      />
   )
}
