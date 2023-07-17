import { Button, Input } from '../ui'
import { Textarea } from '../ui/textarea'
import { Spinner } from '../ui/spinner'

export function ArticleFormLayout({
   onSubmit,
   error,
   isError,
   isLoading,
   btnText,
   disabled,
}: {
   onSubmit: any
   error?: string
   isError: boolean
   isLoading: boolean
   disabled: boolean
   btnText: string
}) {
   return (
      <form onSubmit={onSubmit} className='flex flex-col gap-2 w-4/5 mt-1 sm:w-3/5 h-full'>
         {isError && <p className='text-red-500 px-2'>{error}</p>}
         <Input field='title' placeholder='title' />
         <Input field='description' placeholder='description' />
         <Textarea field='body' placeholder='body of an article' />
         <Input field='tagList' placeholder='tags' />
         <Button disabled={disabled} type='submit' variant='green' classname='ml-auto w-20'>
            <div className='w-full h-full flex flex-row items-center justify-center gap-1'>
               {isLoading && <Spinner width={8} height={8} />}
               {btnText}
            </div>
         </Button>
      </form>
   )
}
