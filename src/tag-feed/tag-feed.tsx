import { ReactNode, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TOKEN_KEY, useLocalStorage } from '../shared/lib'
import { useQuery } from 'react-query'
import { ArticlesWithFilterParams } from '../api/articles'
import { Loading } from '../shared/loading'
import { FeedArticle } from '../feed'
import { Pagination } from '../shared/pagination'
import { PopularTags } from '../shared/popular-tags'

export default function TagFeedPage() {
   const { slug: tag } = useParams()
   const navigate = useNavigate()
   const { get } = useLocalStorage()
   const [page, setPage] = useState<number>(1)
   const handlePageAction = (page: number) => setPage(() => page)

   const { data, isLoading, isSuccess, isError, error } = useQuery({
      queryFn: () => ArticlesWithFilterParams({ token: get(TOKEN_KEY), page, tag }),
      queryKey: ['articles', 'tag', tag],
   })

   const hahdleSwitchBack = () => navigate(-1)
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
            <p className='text-sm mx-auto font-normal mb-1 text-center flex items-center justify-center text-gray-500 select-none'>
               Tired of #{tag} tag?
            </p>
            <div className='w-full mx-auto p-2 rounded-lg'>
               <PopularTags />
            </div>
            <p
               className='text-sm mx-auto font-normal mb-1 text-center flex items-center justify-center text-gray-500 hover:text-black hover:cursor-pointer select-none'
               onClick={hahdleSwitchBack}
            >
               Switch back
            </p>
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
               No articles available. Try another tag! 🐢
            </h2>
            <div className='w-3/5  mx-auto p-2 rounded-lg'>
               <PopularTags />
            </div>
            <p
               className='text-sm mx-auto font-normal mb-1 text-center flex items-center justify-center text-gray-500 hover:text-black hover:cursor-pointer select-none'
               onClick={hahdleSwitchBack}
            >
               Or switch back
            </p>
         </>
      )
   }

   if (isError) {
      content = (
         <>
            <h2 className='text-red-500 font-medium text-center'>{String(error)}</h2>
            <p
               className='text-sm mx-auto font-normal mb-1 text-center flex items-center justify-center text-gray-500 hover:text-black hover:cursor-pointer select-none'
               onClick={hahdleSwitchBack}
            >
               Switch back
            </p>
         </>
      )
   }
   return <div className='flex flex-col items-start pb-4'>{content}</div>
}
