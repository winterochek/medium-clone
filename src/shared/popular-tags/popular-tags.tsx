import { useQuery } from 'react-query'
import { Tags } from '../../api/tags'
import { Loading } from '../loading'
import { TagList } from '../tag-list'
import { PopularTagsLayout } from './popular-tags-layout'

export function PopularTags() {
   const { isLoading, data, isError, isSuccess, error } = useQuery({
      queryKey: 'popular-tags',
      queryFn: Tags,
   })
   return (
      <PopularTagsLayout
         loadingUi={<Loading title='data is loading' />}
         error={String(error)}
         isLoading={isLoading}
         isError={isError}
         isSuccess={isSuccess}
         tagList={<TagList tags={data?.tags} />}
      />
   )
}
