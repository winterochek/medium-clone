import { HTMLProps } from 'react'
import { useFormContext } from 'react-hook-form'

interface Props extends HTMLProps<HTMLInputElement> {
   field: string
   startIcon?: any
   endIcon?: any
}

export default function InputComponent({ field, endIcon: EndIcon, ...rest }: Props) {
   const {
      register,
      formState: { errors },
   } = useFormContext()
   const hasError = !!errors[field]

   return (
      <div className='w-full'>
         <input
            {...register(field)}
            className={`bg-transparent border-2 h-10 focus:border-gray-500 rounded-md py-1 px-2 flex self-center w-full transition-all ease-in focus:outline-none text-black placeholder:text-gray-500
            ${hasError ? 'border-red-500' : ''}
            `}
            {...rest}
         />
         <div className='absolute right-1 top-0 h-10 flex items-center justify-center'>
            {EndIcon && <EndIcon />}
         </div>
         {errors[field] && (
            <span className='my-0 px-2 text-red-500'>{String(errors[field]?.message)}</span>
         )}
      </div>
   )
}
