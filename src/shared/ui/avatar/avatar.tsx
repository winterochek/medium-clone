import { HTMLProps } from 'react'

interface Props extends HTMLProps<HTMLImageElement> {
   // onClick: () => void
}
export default function AvatarComponent(props: Props) {
   return (
      <img
         {...props}
        //  onClick={handleNavigate}
        //  src={author.image}
        //  alt={author.username}
        //  height={40}
        //  width={40}
         className='rounded-full hover:cursor-pointer'
      />
   )
}
