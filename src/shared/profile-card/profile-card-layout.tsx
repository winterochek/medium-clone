import clsx from 'clsx'
import { ReactNode } from 'react'

export function ProfileCardLayout({
   avatar,
   username,
   buttons,
   bio,
   followed,
}: {
   avatar: ReactNode
   username: ReactNode
   buttons: ReactNode
   bio?: ReactNode
   followed?: boolean
}) {
   return (
      <div className='flex flex-row items-center py-2 px-8 rounded-lg bg-white h-40 shadow-lg'>
         <div className='flex items-center justify-center overflow-hidden'>{avatar}</div>
         <div className='flex-1 flex flex-col items-start gap-2 px-8'>
            <div
               className={clsx(
                  'font-semibold text-xl transition-all ease-in',
                  followed && 'text-green-500',
                  !followed && 'text-black'
               )}
            >
               {username}
            </div>
            <div className='font-medium text-sm text-gray-500'>
               {bio || 'No biography provided'}
            </div>
         </div>
         <div className='flex items-center justify-center'>{buttons}</div>
      </div>
   )
}
