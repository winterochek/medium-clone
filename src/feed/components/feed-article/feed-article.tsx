import { Link, useNavigate } from 'react-router-dom'
import { ArticleInterface } from '../../../models'
import UserInfo from './user-info'
import { TagList } from '../../../shared/tag-list'

type Props = {
   article: ArticleInterface
}

export default function FeedArticleComponent({ article }: Props) {
   const navigate = useNavigate()
   const handleNavigate = () => navigate(`/articles/${article.slug}`)
   return (
      <div className='border-b-2 border-green-300 border-opacity-50 flex flex-col gap-2 w-full py-1 sm:py-2 md:py-4'>
         <UserInfo {...article} />
         <div className='flex flex-col gap-1'>
            <h3
               onClick={handleNavigate}
               className='text-black font-semibold text-base sm:text-lg md:text-xl lg:text-2xl hover:cursor-pointer line-clamp-2 text-justify'
            >
               {article.title}
            </h3>
            <p className='text-gray-500 text-xs sm:text-base md:text-lg lg:text-xl text-justify line-clamp-3'>{article.body}</p>
         </div>
         <div className='flex flex-row justify-between items-center'>
            <Link
               className='text-gray-400 text-xs sm:text-sm md:text-base hover:cursor-pointer hover:text-gray-500'
               to={`/articles/${article.slug}`}
            >
               read more...
            </Link>
            <TagList tags={article.tagList} />
         </div>
      </div>
   )
}
