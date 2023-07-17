import { HTMLProps } from 'react'
import { useFormContext } from 'react-hook-form'

interface Props extends HTMLProps<HTMLTextAreaElement> {
   field: string
}
export function Textarea({ field, ...rest }: Props) {
   const {
      register,
      formState: { errors },
   } = useFormContext()
   const hasError = !!errors[field]
   return (
      <div>
         <textarea
            {...register(field)}
            className={`bg-transparent border-2 h-24 focus:border-gray-500 rounded-md py-1 px-2 flex self-center w-full transition-all ease-in focus:outline-none text-black placeholder:text-gray-500
            ${hasError ? 'border-red-500' : ''}
            `}
            {...rest}
         ></textarea>
         {errors[field] && (
            <span className='my-0 px-2 text-red-500'>{String(errors[field]?.message)}</span>
         )}
      </div>
   )
}
