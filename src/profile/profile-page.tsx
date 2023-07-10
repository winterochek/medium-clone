import { useParams } from 'react-router-dom'
import { ProfileCard, ProfileCardSkeleton } from '../shared/profile-card'
import { useQuery } from 'react-query'
import { Profile } from '../api/profiles'
import { TOKEN_KEY, useLocalStorage } from '../shared/lib'
import { Error } from './components/error-component'

export default function ProfilePage() {
   const { slug: username } = useParams()
   const { get } = useLocalStorage()
   const { data, isError, error } = useQuery({
      queryKey: ['profile', username],
      queryFn: () => Profile({ username: username || '', token: get(TOKEN_KEY) }),
   })

   return (
      <div className='flex flex-col mt-5'>
         {!!data?.profile ? <ProfileCard profile={data.profile} /> : <ProfileCardSkeleton />}
         {isError && <Error message={String(error)} />}
      </div>
   )
}
