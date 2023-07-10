export default function TagListComponent({ tags }: { tags: string[] }) {
   return (
      <div className='flex flex-row flex-wrap gap-2'>
         {tags.map(tag => (
            <div className='inline-block border border-gray-500 text-gray-500 p-1 rounded-xl overflow-hidden text-sm hover:cursor-pointer select-none'>
               {tag}
            </div>
         ))}
      </div>
   )
}
