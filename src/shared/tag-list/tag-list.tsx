import { useNavigate } from 'react-router-dom'

export function TagList({ tags }: { tags?: string[] }) {
   const navigate = useNavigate()
   const handleNavigate = (tag: string) => navigate(`/tag/${tag}`)
   return (
      <div className='flex flex-row flex-wrap gap-2 justify-start'>
         {tags?.map((tag, i) => (
            <div
               key={`${tag}/${i}`}
               className='inline-block border border-gray-500 text-gray-500 py-[2px] px-1 sm:py-1 sm:px-2 rounded-xl overflow-hidden text-xs sm:text-sm md:text-base hover:cursor-pointer select-none'
               onClick={() => handleNavigate(tag)}
            >
               {tag}
            </div>
         ))}
      </div>
   )
}
