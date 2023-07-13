import { useParams } from 'react-router-dom'
import { Avatar, Button } from '../../shared/ui'
import { useQuery } from 'react-query'
import { ParticularArticle } from '../../api/articles'
import { Loading } from '../../shared/loading'
import { format } from 'date-fns'
import { TagList } from '../../shared/tag-list'
import Commentaries from './components/commentaries-container'

export default function SingleArticlePage() {
   const { slug: articleSlug } = useParams()
   const { isLoading, isError, error, data } = useQuery({
      queryKey: ['single-article', articleSlug],
      queryFn: () => ParticularArticle({ slug: articleSlug || '' }),
   })

   const date = (createdAt?: string) => format(new Date(createdAt || ''), 'dd-MM-yyyy')
   
   if (isLoading || !articleSlug) {
      return <Loading title='Article is loading' />
   }

   if (isError) {
      return <h2 className='text-red-500 font-medium text-center'>{String(error)}</h2>
   }
   return (
      <div className='flex flex-col gap-5'>
         <div className='bg-green-500 py-4 px-4 rounded-lg flex flex-col gap-4'>
            <h1 className='text-white font-semibold text-3xl text-justify'>
               {data?.article.title}
            </h1>
            <div className='flex flex-row gap-4 items-center justify-start'>
               <Avatar width={40} height={40} src={data?.article.author.image} />
               <div className='flex flex-col justify-between'>
                  <h3 className='text-white text-lg'>{data?.article.author.username}</h3>
                  <p className='text-black text-sm'>{date(data?.article?.createdAt)}</p>
               </div>
               <Button variant='outline' classname='border-white w-24'>
                  follow
               </Button>
            </div>
         </div>
         <div className='text-black text-justify text-base px-2'>{data?.article.body}</div>
         <div className='px-2'>
            <TagList tags={data?.article.tagList || []} />
         </div>
         <Commentaries slug={articleSlug} />
      </div>
   )
}
