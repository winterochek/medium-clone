import { useQuery } from 'react-query'
import { Tags } from '../../api/tags'
import { Loading } from '../loading'
import { TagList } from '../tag-list'

export default function PopularTagsComponent() {
   const { isLoading, data, isError, isSuccess, error } = useQuery({
      queryKey: 'popular-tags',
      queryFn: Tags,
   })
   return (
      <div className='w-full h-full'>
         {isLoading && <Loading title='data is loading' classname='w-5 h-5 sm:w-6 sm:h-6' />}
         {isError && <h2 className='text-red-500 font-medium text-center'>{String(error)}</h2>}
         {isSuccess && <TagList tags={data.tags} />}
      </div>
   )
}
