import { useState } from 'react'
import { FeedEnum } from './types'
import { FeedArticle } from './components/feed-article'
import { TOKEN_KEY, useLocalStorage, PAGE_KEY } from '../shared/lib'
import { useQuery } from 'react-query'
import { Articles } from '../api'
import { Loading } from '../shared/loading'
import { Pagination } from '../shared/pagination'

export default function FeedPage() {
   const [feed, setFeed] = useState(FeedEnum.GLOBAL)
   const { get, set } = useLocalStorage()
   const [page, setPage] = useState<number>(Number(get(PAGE_KEY)) || 1)
   console.log('setState')
   const isPersonal = feed === FeedEnum.PERSONAL
   const { data, isLoading, isSuccess, isError, error } = useQuery({
      queryKey: ['articles', isPersonal, page],
      queryFn: () => Articles({ onlyPersonal: isPersonal, token: get(TOKEN_KEY), page }),
      // keepPreviousData: true,
   })
   const switchFeed = feed === FeedEnum.GLOBAL ? FeedEnum.PERSONAL : FeedEnum.GLOBAL
   const handleSwitchFeed = () => setFeed(switchFeed)
   const handlePageAction = (page: number) => {
      set(PAGE_KEY, page)
      setPage(() => page)
   }
   let content: JSX.Element

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
               No articles available. Consider following anyone! 🐢
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
   return (
      <div className='flex flex-col items-start pb-4'>
         <span
            onClick={handleSwitchFeed}
            className='text-sm mx-auto font-normal mb-1 text-center flex items-center justify-center text-gray-500 hover:text-black hover:cursor-pointer select-none'
         >
            Switch to {switchFeed} feed
         </span>
         {content!}
      </div>
   )
}
