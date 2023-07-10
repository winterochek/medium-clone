import { Spinner } from '../ui/spinner'

export default function ProfileCardSkeletonComponent() {
   return (
      <div className='flex flex-row items-center py-2 px-8 rounded-lg bg-white h-40 shadow-lg'>
         <div className='flex items-center justify-center overflow-hidden'>
            <Spinner width={60} height={60} />
         </div>
         <div className='flex-1 flex flex-col items-start gap-2 px-8'>
            <div className='bg-gray-300 rounded-full shadow-sm animate-pulse h-4 w-2/5'></div>
            <div className='bg-gray-200 rounded-full shadow-sm animate-pulse h-4 w-1/5'></div>
         </div>
         <div className='flex items-center justify-center'>
            <div className='w-10 h-6 flex items-center justify-center'>
               <Spinner height={20} width={20} />
            </div>
         </div>
      </div>
   )
}
