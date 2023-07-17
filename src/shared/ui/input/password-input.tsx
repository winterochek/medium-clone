import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Input } from './input'

type Props = {
   field: string
   placeholder: string
}

export function PasswordInput(props: Props) {
   const [isShown, setIsShown] = useState(false)
   const switchVisibility = () => setIsShown(s => !s)
   const icon = () => {
      return isShown ? (
         <AiOutlineEyeInvisible className='w-5 h-5 transition-all ease-in' />
      ) : (
         <AiOutlineEye className='w-5 h-5 transition-all ease-in' />
      )
   }
   return (
      <div className='relative'>
         <Input {...props} type={isShown ? 'text' : 'password'} />
         <div
            onClick={switchVisibility}
            className='absolute right-3 top-0 h-10 flex items-center justify-center hover:cursor-pointer transition-all ease-in'
         >
            {icon()}
         </div>
      </div>
   )
}
