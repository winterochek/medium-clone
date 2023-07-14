import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { ParticularArticle } from '../../api/articles'
import { Loading } from '../../shared/loading'
import { TagList } from '../../shared/tag-list'
import Commentaries from './components/commentaries-container'
import ArticleCard from './components/article-card'
import { TOKEN_KEY, useAuthStore, useLocalStorage } from '../../shared/lib'

export default function SingleArticlePage() {
   const { slug: articleSlug } = useParams()
   const { get } = useLocalStorage()
   const { isLoading, isError, error, data } = useQuery({
      queryKey: ['single-article', articleSlug],
      queryFn: () => ParticularArticle({ slug: articleSlug || '', token: get(TOKEN_KEY) }),
   })

   const { user } = useAuthStore()

   if (isLoading || !articleSlug) {
      return <Loading title='Article is loading' classname='w-5 h-5 sm:w-6 sm:h-6' />
   }

   if (isError) {
      return <h2 className='text-red-500 font-medium text-center'>{String(error)}</h2>
   }
   return (
      <div className='flex flex-col gap-5 pb-8'>
         {data?.article ? (
            <ArticleCard
               article={data.article}
               isOwn={data.article?.author.username === user?.username}
               isAnonymous={!user}
            />
         ) : null}
         <div className='text-black text-justify text-base px-2'>{data?.article.body}</div>
         <div className='px-2'>
            <TagList tags={data?.article.tagList || []} />
         </div>
         <Commentaries slug={articleSlug} />
      </div>
   )
}
