import { useNavigate } from 'react-router-dom'

export default function TagListComponent({ tags }: { tags: string[] }) {
   const navigate = useNavigate()
   const handleNavigate = (tag: string) => navigate(`/tag/${tag}`)
   return (
      <div className='flex flex-row flex-wrap gap-2'>
         {tags.map((tag, i) => (
            <div
               key={`${tag}/${i}`}
               className='inline-block border border-gray-500 text-gray-500 py-1 px-2 rounded-xl overflow-hidden text-sm hover:cursor-pointer select-none'
               onClick={() => handleNavigate(tag)}
            >
               {tag}
            </div>
         ))}
      </div>
   )
}
