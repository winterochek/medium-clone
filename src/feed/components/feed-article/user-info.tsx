import { AiOutlineLike } from 'react-icons/ai'
import { ArticleInterface } from '../../../models'
import { Button, Avatar } from '../../../shared/ui'
import { useState } from 'react'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { useMutation } from 'react-query'
import { LikeOrDislikeArticle } from '../../../api'
import { useAuthStore } from '../../../shared/lib'
import { UseToken } from '../../../shared/lib/use-token'

export default function UserInfo({
   author,
   slug,
   createdAt,
   favorited,
   favoritesCount,
}: ArticleInterface) {
   const [liked, setIsLiked] = useState(favorited)
   const [likes, setLikes] = useState(favoritesCount)
   const { user } = useAuthStore()
   const navigate = useNavigate()
   const token = UseToken()
   const handleNavigate = () => navigate(`/profile/${author.username}`)
   const { mutate, isError, error } = useMutation({ mutationFn: LikeOrDislikeArticle })
   const handleLike = () => {
      if (!user || !token) return
      setIsLiked(l => !l)
      if (liked) {
         setLikes(n => n - 1)
         mutate({ action: 'dismiss', slug, token })
      } else {
         setLikes(n => n + 1)
         mutate({ action: 'like', slug, token })
      }
   }
   const getVariant = () => {
      if (liked && !isError) return 'green'
      if (!liked && !isError) return 'outline'
      if (isError) return 'danger'
      return 'gray'
   }
   const date = format(new Date(createdAt), 'dd-MM-yyyy')
   return (
      <div className='flex flex-row justify-between items-center'>
         <div className='flex flex-row gap-1 sm:gap-2 md:gap-3 h-full'>
            <div className='flex items-center justify-center'>
               <Avatar
                  onClick={handleNavigate}
                  src={author.image}
                  alt={author.username}
                  classname='w-10 h-10 md:w-12 md:h-12'
               />
            </div>
            <div className='flex flex-col items-start'>
               <p
                  onClick={handleNavigate}
                  className='text-green-500 text-lg md:text-xl font-medium hover:cursor-pointer hover:underline'
               >
                  {author.username}
               </p>
               <p className='text-gray-500 text-xs sm:text-sm md:text-base'>{date}</p>
            </div>
         </div>
         <Button
            onClick={handleLike}
            variant={getVariant()}
            disabled={!user}
            classname={clsx('', !user && 'border-none bg-none')}
         >
            <div className='flex flex-row items-center gap-1'>
               {!isError && (
                  <>
                     <AiOutlineLike
                        className={clsx(liked && 'fill-white', !liked && 'fill-green-500')}
                     />
                     <span
                        className={clsx(
                           'text-xs md:text-base lg:text-lg',
                           liked && 'text-white',
                           !liked && 'text-green-500'
                        )}
                     >
                        {likes}
                     </span>
                  </>
               )}
               <p>{isError && String(error)}</p>
            </div>
         </Button>
      </div>
   )
}
