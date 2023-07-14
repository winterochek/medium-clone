import { PopularTags } from '../../../shared/popular-tags'

export default function ExploreTagsComponent() {
   return (
      <div className='flex flex-col items-center justify-between w-full lg:w-4/5 lg:mx-auto'>
         <p className='text-sm md:text-base mx-auto font-normal mb-1 text-center flex items-center justify-center text-gray-500 select-none'>
            Explore popular tags
         </p>
         <div className='w-full mx-auto p-2 rounded-lg'>
            <PopularTags />
         </div>
      </div>
   )
}
