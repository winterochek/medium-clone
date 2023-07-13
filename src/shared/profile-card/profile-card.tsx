import { useState } from 'react'
import { ProfileInterface } from '../../models'
import { Avatar, Button } from '../ui'
import clsx from 'clsx'
import { useMutation } from 'react-query'
import { Follow, UnFollow } from '../../api/profiles'
import { useAuthStore } from '../lib'
import { useNavigate } from 'react-router-dom'
import { UseToken } from '../lib/use-token'

interface Props {
   profile: ProfileInterface
   isOwn: boolean
}

export default function ProfileCardComponent({ profile, isOwn }: Props) {
   const [followed, setFollowed] = useState(!!profile?.following)
   const navigate = useNavigate()
   const token = UseToken()
   const { user } = useAuthStore()
   const { mutate } = useMutation({ mutationFn: followed ? UnFollow : Follow })

   const variant = () => (!!user ? (followed ? 'outline' : 'green') : 'gray')
   const btnText = () =>
      isOwn ? 'edit' : !!user ? (followed ? 'unfollow' : 'follow') : 'sign in to follow'

   const handleClick = () => {
      if (!token) return
      if (isOwn) {
         navigate('/settings')
      }
      if (!user) {
         navigate('/login')
      }
      if (!isOwn) {
         setFollowed(v => !v)
         mutate({ username: profile?.username || '', token })
      }
   }
   return (
      <div className='flex flex-row items-center py-2 px-8 rounded-lg bg-white h-40 shadow-lg'>
         <div className='flex items-center justify-center overflow-hidden'>
            <Avatar height={60} width={60} alt={profile?.username} src={profile?.image} />
         </div>
         <div className='flex-1 flex flex-col items-start gap-2 px-8'>
            <h1
               className={clsx(
                  'font-semibold text-lg transition-all ease-in',
                  followed && 'text-green-500',
                  !followed && 'text-black'
               )}
            >
               {profile?.username}
            </h1>
            <p className='font-medium text-sm text-gray-500'>
               {profile?.bio || 'No biography provided'}
            </p>
         </div>
         <div className='flex items-center justify-center'>
            <Button onClick={handleClick} variant={variant()} classname='w-20'>
               {btnText()}
            </Button>
         </div>
      </div>
   )
}
