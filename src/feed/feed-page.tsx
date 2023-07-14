import { useState } from 'react'
import { FeedEnum } from './types'
import { FeedArticle } from './components/feed-article'
import { useQuery } from 'react-query'
import { Articles } from '../api'
import { Loading } from '../shared/loading'
import { Pagination } from '../shared/pagination'
import { ExploreTags } from './components/explore-tags'
import { UseToken } from '../shared/lib/use-token'
import { usePage } from '../shared/lib/use-page'

export default function FeedPage() {
   const [feed, setFeed] = useState(FeedEnum.GLOBAL)
   const token = UseToken()
   const { page: lsPage, setPage: setLsPage } = usePage()
   const [page, setPage] = useState<number>(Number(lsPage) || 1)
   const isPersonal = feed === FeedEnum.PERSONAL
   const { data, isLoading, isSuccess, isError, error } = useQuery({
      queryKey: ['articles', isPersonal, page],
      queryFn: () => Articles({ onlyPersonal: isPersonal, token, page }),
   })
   const switchFeed = feed === FeedEnum.GLOBAL ? FeedEnum.PERSONAL : FeedEnum.GLOBAL
   const handleSwitchFeed = () => setFeed(switchFeed)
   const handlePageAction = (page: number) => {
      setLsPage(page)
      setPage(() => page)
   }

   let content: JSX.Element

   if (isLoading) {
      content = (
         <div className='w-full flex items-center justify-center'>
            <Loading title='Your feed is loading' classname='w-5 h-5 sm:w-6 sm:h-6' />
         </div>
      )
   }

   if (isSuccess) {
      content = (
         <>
            <ExploreTags />
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
            <ExploreTags />
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
            className='text-sm md:text-base mx-auto font-normal mb-1 text-center flex items-center justify-center text-gray-500 hover:text-black hover:cursor-pointer select-none'
         >
            Switch to {switchFeed} feed
         </span>
         {content!}
      </div>
   )
}
