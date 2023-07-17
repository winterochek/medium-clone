import { Spinner } from '../ui/spinner'

export function SuspenseLoading() {
   return (
      <div className='fixed inset-0 bg-slate-900/60 backdrop-blur flex items-center justify-center'>
         <Spinner classname='h-10 w-10' />
      </div>
   )
}
