import { useParams } from 'react-router-dom'
import { ProfileCard, ProfileCardSkeleton } from '../shared/profile-card'
import { useQuery } from 'react-query'
import { Profile } from '../api/profiles'
import { useAuthStore } from '../shared/lib'
import { Error } from './components/error-component'
import { ProfileFeed } from './components/profile-feed'
import { UseToken } from '../shared/lib/use-token'

export default function ProfilePage() {
   const { slug: username } = useParams()
   const { user } = useAuthStore()
   const token = UseToken()
   const { data, isError, error } = useQuery({
      queryKey: ['profile', username],
      queryFn: () => Profile({ username: username || '', token }),
   })

   return (
      <div className='flex flex-col mt-5'>
         {!!data?.profile ? (
            <div className='flex flex-col gap-4'>
               <ProfileCard profile={data.profile} isOwn={user?.username === username} />
               <ProfileFeed profile={data.profile} />
            </div>
         ) : (
            <ProfileCardSkeleton />
         )}
         {isError && <Error message={String(error)} />}
      </div>
   )
}
