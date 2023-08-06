import { FormProvider, useForm } from 'react-hook-form'
import { CommentFormInterface } from './types'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './schema'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui'
import { Spinner } from '../ui/spinner'

type Props = {
   isLoading: boolean
   error: string
   isError: boolean
   mutateFn: (data: CommentFormInterface) => void
}

export default function CommentFormComponent({ isLoading, isError, error, mutateFn }: Props) {
   // @ts-ignore
   const form = useForm<CommentFormInterface>({ resolver: yupResolver(schema) })
   const handleMutation = (data: CommentFormInterface) => {
      mutateFn(data)
      form?.reset()
   }

   const isValid = form.formState.isValid
   const isSubmitted = form.formState.isSubmitted
   const disabled = (isSubmitted && !isValid) || isLoading
   return (
      <FormProvider {...form}>
         <form
            onSubmit={form.handleSubmit(handleMutation)}
            className='flex flex-col gap-2 w-full h-full'
         >
            {isError && <p className='text-red-500 px-2'>{error}</p>}
            <Textarea field='body' placeholder='share your thoughts' />
            <Button disabled={disabled} type='submit' variant='green' classname='ml-auto w-18'>
               <div className='w-full h-full flex flex-row items-center justify-center gap-1'>
                  {isLoading && <Spinner width={8} height={8} />}
                  Share
               </div>
            </Button>
         </form>
      </FormProvider>
   )
}
