import { PopularTags } from '../../../shared/popular-tags'

export default function ExploreTagsComponent() {
   return (
      <div className='flex flex-row items-center justify-between w-full'>
         <p className='w-1/5 text-sm mx-auto font-normal mb-1 text-center flex items-center justify-center text-gray-500 select-none'>
            Explore popular tags
         </p>
         <div className='w-full mx-auto p-2 rounded-lg'>
            <PopularTags />
         </div>
      </div>
   )
}
