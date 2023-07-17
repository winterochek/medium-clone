import { ReactNode } from 'react'

export function SettingsFormLayout({
   onSubmit,
   isError,
   error,
   isSuccess,
   email,
   picture,
   username,
   bio,
   buttons,
}: {
   onSubmit: any
   error: string
   isError: boolean
   isSuccess: boolean
   email: ReactNode
   picture: ReactNode
   username: ReactNode
   bio: ReactNode
   buttons: ReactNode
}) {
   return (
      <form onSubmit={onSubmit} className='flex flex-col gap-2 w-4/5 md:w-3/5 h-full md:text-base'>
         {isError && <p className='text-red-500 px-2'>{error}</p>}
         {isSuccess && (
            <p className='px-2 text-gray-500 font-medium text-lg text-right'>
               🐥 Successfully updated
            </p>
         )}
         {email}
         {picture}
         {username}
         {bio}
         <div className='ml-auto flex flex-row gap-4'>{buttons}</div>
      </form>
   )
}
