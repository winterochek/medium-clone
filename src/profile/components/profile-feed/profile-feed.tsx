import { useState } from 'react'
import { ProfileInterface } from '../../../models'
import { FeedEnum } from './types'
import AuthoredFeed from './authored-feed'
import LikedFeed from './liked-feed'

interface Props {
   profile: ProfileInterface
}
export default function ProfileFeedComponent({ profile }: Props) {
   const [feed, setFeed] = useState(FeedEnum.AUTHORED)
   const switchFeed = feed === FeedEnum.AUTHORED ? FeedEnum.LIKED : FeedEnum.AUTHORED
   const handleSwitchFeed = () => setFeed(switchFeed)
   return (
      <div className='flex flex-col items-start pb-4'>
         <span
            onClick={handleSwitchFeed}
            className='text-sm mx-auto font-normal mb-1 text-center flex items-center justify-center text-gray-500 hover:text-black hover:cursor-pointer select-none'
         >
            Switch to {switchFeed} feed
         </span>
         {feed === FeedEnum.AUTHORED ? (
            <AuthoredFeed profile={profile} />
         ) : (
            <LikedFeed profile={profile} />
         )}
      </div>
   )
}
