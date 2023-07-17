import { Spinner } from '../ui/spinner'

export default function LoadingComponent({
   title,
   classname = 'w-5 h-5 sm:w-6 sm:h-6',
}: {
   title: string
   classname?: string
}) {
   return (
      <div className='flex flex-row gap-5 items-center justify-center'>
         <span className='text-green-500 md:text-base lg:text-lg'>{title}</span>
         <Spinner classname={classname} />
      </div>
   )
}
