import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { format } from 'date-fns'
import { ArticleInterface } from '../../../models'
import { Avatar, Button } from '../../../shared/ui'
import { Follow, UnFollow } from '../../../api/profiles'
import clsx from 'clsx'
import { UseToken } from '../../../shared/lib/use-token'
import { DeleteArticle } from '../../../api/articles'

export default function ArticleCard({
   article,
   isOwn,
   isAnonymous,
}: {
   article: ArticleInterface
   isOwn: boolean
   isAnonymous: boolean
}) {
   const [followed, setFollowed] = useState(!!article.author.following)
   const navigate = useNavigate()
   const token = UseToken()
   const { mutate } = useMutation({ mutationFn: followed ? UnFollow : Follow })

   const date = (createdAt?: string) => format(new Date(createdAt || ''), 'dd-MM-yyyy')

   const getVariant = () => {
      if (isOwn) return 'outline'
      if (isAnonymous) return 'gray'
      return followed ? 'gray' : 'outline'
   }

   const getBtnText = () => {
      if (isOwn) return 'edit'
      if (isAnonymous) return <Link to={'/login'}>sign in to follow</Link>
      return followed ? 'unfollow' : 'follow'
   }

   const getHandleClick = () => {
      if (isOwn) return () => navigate(`/articles/${article.slug}/edit`)
      if (isAnonymous) return
      return () => {
         if (!token) return
         const username = article.author.username
         setFollowed(v => !v)
         mutate({ username, token })
      }
   }
   return (
      <div className='bg-green-500 py-4 px-4 rounded-lg flex flex-col gap-4'>
         <h1 className='text-white font-semibold text-3xl text-justify'>{article?.title}</h1>
         <div className='flex flex-row gap-4 items-center justify-start'>
            <Link to={`/profile/${article?.author.username}`}>
               <Avatar width={40} height={40} src={article?.author.image} />
            </Link>
            <div className='flex flex-col justify-between'>
               <Link to={`/profile/${article?.author.username}`}>
                  <h3 className='text-white text-lg'>{article?.author.username}</h3>
               </Link>
               <p className='text-black text-sm'>{date(article?.createdAt)}</p>
            </div>
            <Button
               onClick={getHandleClick()}
               classname={clsx(isAnonymous && 'w-48', !isAnonymous && 'w-20')}
               variant={getVariant()}
            >
               {getBtnText()}
            </Button>
            {isOwn && <DeleteButton token={token} slug={article.slug} />}
         </div>
      </div>
   )
}

function DeleteButton({ token, slug }: { token?: string; slug: string }) {
   const { mutate, isLoading } = useMutation({ mutationFn: DeleteArticle })
   const navigate = useNavigate()
   const handleDelete = () => {
      if (!token) return
      mutate({ slug, token })
      navigate('/')
   }
   return (
      <Button variant='danger' classname='w-20' disabled={isLoading} onClick={handleDelete}>
         delete
      </Button>
   )
}
