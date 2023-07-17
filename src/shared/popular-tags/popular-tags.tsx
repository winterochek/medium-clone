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
         {isLoading && <Loading title='data is loading' />}
         {isError && (
            <h2 className='text-red-500 font-medium text-center md:text-base lg:text-lg'>
               {String(error)}
            </h2>
         )}
         {isSuccess && <TagList tags={data.tags} />}
      </div>
   )
}
