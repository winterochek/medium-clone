import { ReactNode, useState } from 'react'
import { ProfileInterface } from '../../../models'
import { TOKEN_KEY, useLocalStorage } from '../../../shared/lib'
import { useQuery } from 'react-query'
import { ArticlesWithFilterParams } from '../../../api/articles'
import { Loading } from '../../../shared/loading'
import { FeedArticle } from '../../../feed'
import { Pagination } from '../../../shared/pagination'

export default function AuthoredFeedComponent({ profile }: { profile: ProfileInterface }) {
   const { get } = useLocalStorage()
   const [page, setPage] = useState<number>(1)
   const handlePageAction = (page: number) => setPage(() => page)
   const { data, isLoading, isSuccess, isError, error } = useQuery({
      queryKey: ['articles', 'authored', profile.username, page],
      queryFn: () =>
         ArticlesWithFilterParams({ token: get(TOKEN_KEY), page, author: profile.username }),
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
                  pagesCount={Math.ceil(data?.articlesCount / 5)}
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
               No articles available. <span className='text-gray-500'>{profile.username}</span>{' '}
               keeps his secrets 🐢
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
