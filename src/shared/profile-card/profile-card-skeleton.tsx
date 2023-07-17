import { Spinner } from '../ui/spinner'
import { ProfileCardLayout } from './profile-card-layout'

export function ProfileCardSkeleton() {
   return (
      <ProfileCardLayout
         avatar={<Spinner width={60} height={60} />}
         username={<div className='bg-gray-300 rounded-full shadow-sm animate-pulse h-4 w-2/5' />}
         bio={<div className='bg-gray-200 rounded-full shadow-sm animate-pulse h-4 w-1/5' />}
         buttons={
            <div className='w-10 h-6 flex items-center justify-center'>
               <Spinner height={20} width={20} />
            </div>
         }
      />
   )
}
