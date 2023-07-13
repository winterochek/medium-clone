import { ReactNode, useState } from 'react'
import { ProfileInterface } from '../../../models'
import { useQuery } from 'react-query'
import { ArticlesWithFilterParams } from '../../../api/articles'
import { Loading } from '../../../shared/loading'
import { FeedArticle } from '../../../feed'
import { Pagination } from '../../../shared/pagination'
import { UseToken } from '../../../shared/lib/use-token'

export default function LikedFeedComponent({ profile }: { profile: ProfileInterface }) {
   const token = UseToken()
   const [page, setPage] = useState<number>(1)
   const handlePageAction = (page: number) => setPage(() => page)
   const { data, isLoading, isSuccess, isError, error } = useQuery({
      queryKey: ['articles', 'liked', profile.username, page],
      queryFn: () => ArticlesWithFilterParams({ token, page, liked: profile.username }),
   })
   let content: ReactNode

   if (isLoading) {
      content = (
         <div className='w-full flex items-center justify-center'>
            <Loading title='Your feed is loading' />
         </div>
      )
   }

   if (isSuccess) {
      content = (
         <>
            {data?.articles?.map(article => (
               <FeedArticle key={article.slug} article={article} />
            ))}
            <div className='mt-4'>
               <Pagination
                  currentPage={page}
                  pagesCount={Math.ceil(data?.articlesCount / 10)}
                  action={handlePageAction}
               />
            </div>
         </>
      )
   }
   if (isSuccess && !data.articlesCount) {
      content = (
         <>
            <h2 className='text-black mx-auto font-medium text-center py-2'>
               No articles available. <span className='text-gray-500'>{profile.username}</span> does
               not like anyone. At least, yet 🐢
            </h2>
         </>
      )
   }
   if (isError) {
      content = (
         <>
            <h2 className='text-red-500 font-medium text-center'>{String(error)}</h2>
         </>
      )
   }
   return <>{content}</>
}
