import { useState } from 'react'
import { ProfileInterface } from '../../models'
import { Avatar, Button } from '../ui'
import clsx from 'clsx'
import { useMutation } from 'react-query'
import { Follow, UnFollow } from '../../api/profiles'
import { TOKEN_KEY, useLocalStorage } from '../lib'

interface Props {
   profile: ProfileInterface
}

export default function ProfileCardComponent({ profile }: Props) {
   const [followed, setFollowed] = useState(!!profile?.following)
   const { get } = useLocalStorage()
   const { mutate } = useMutation({ mutationFn: followed ? UnFollow : Follow })

   const variant = () => (followed ? 'outline' : 'green')
   const btnText = () => (followed ? 'unfollow' : 'follow')

   const handleFollow = () => {
      setFollowed(v => !v)
      mutate({ username: profile?.username || '', token: get(TOKEN_KEY) || '' })
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
            <Button onClick={handleFollow} variant={variant()}>
               {btnText()}
            </Button>
         </div>
      </div>
   )
}
