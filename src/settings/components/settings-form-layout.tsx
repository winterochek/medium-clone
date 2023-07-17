import { Button, Input } from '../../shared/ui'
import { Label } from '../../shared/ui/label'
import { Spinner } from '../../shared/ui/spinner'

export function SettingsFormLayout({
   onSubmit,
   isError,
   error,
   isLoading,
   isSuccess,
   disabled,
}: {
   onSubmit: any
   error: string
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
   disabled: boolean
}) {
   return (
      <form onSubmit={onSubmit} className='flex flex-col gap-2 w-4/5 md:w-3/5 h-full md:text-base'>
         {isError && <p className='text-red-500 px-2'>{error}</p>}
         {isSuccess && (
            <p className='px-2 text-gray-500 font-medium text-lg text-right'>
               🐥 Successfully updated
            </p>
         )}
         <>
            <Label title='Email'>
               <Input field='email' placeholder='mail@mail.com' />
            </Label>
            <Label title='Picture'>
               <Input field='image' placeholder='it has to be a link' />
            </Label>
            <div className='flex flex-col items-start gap-1'>
               <Label title='Username'>
                  <Input field='username' placeholder='your unique nickname' />
               </Label>
               <span className='text-gray-500 font-medium text-sm px-2'>
                  remember, username must be unique
               </span>
            </div>
            <Label title='Biography'>
               <Input field='bio' placeholder='describe yourself' />
            </Label>
            <Button disabled={disabled} type='submit' variant='green' classname='ml-auto w-20'>
               <div className='w-full h-full flex flex-row items-center justify-center gap-1'>
                  {isLoading && <Spinner width={2} height={2} />}
                  Update
               </div>
            </Button>
         </>
      </form>
   )
}
