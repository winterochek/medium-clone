import { useState } from 'react'
import { ProfileInterface } from '../../models'
import { Avatar, Button } from '../ui'
import { useMutation } from 'react-query'
import { Follow, UnFollow } from '../../api/profiles'
import { useAuthStore } from '../lib'
import { useNavigate } from 'react-router-dom'
import { UseToken } from '../lib/use-token'
import { ProfileCardLayout } from './profile-card-layout'

export function ProfileCard({ profile, isOwn }: { profile: ProfileInterface; isOwn: boolean }) {
   const [followed, setFollowed] = useState(!!profile.following)
   const navigate = useNavigate()
   const token = UseToken()
   const { user } = useAuthStore()
   const { mutate } = useMutation({ mutationFn: followed ? UnFollow : Follow })

   const variant = () => {
      if (!!user) return followed ? 'outline' : 'green'
      if (isOwn) return 'green'
      return 'gray'
   }
   const btnText = () => {
      if (isOwn) return 'edit'
      if (!!user) {
         return followed ? 'unfollow' : 'follow'
      }
      return 'sign in to follow'
   }

   const handleClick = () => {
      if (!token) return
      if (isOwn) {
         navigate('/settings')
      }
      if (!isOwn) {
         setFollowed(v => !v)
         mutate({ username: profile.username, token })
      }
      if (!user) {
         navigate('/login')
      }
   }
   return (
      <ProfileCardLayout
         avatar={<Avatar height={60} width={60} alt={profile.username} src={profile.image} />}
         username={profile.username}
         bio={profile.bio}
         buttons={
            <>
               <Button onClick={handleClick} variant={variant()}>
                  {btnText()}
               </Button>
            </>
         }
         followed={followed}
      />
   )
}
