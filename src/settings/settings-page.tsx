import { useAuthStore } from '../shared/lib'
import { Loading } from '../shared/loading'
import { SettingsForm } from './components'

export default function SettingsPage() {
   const { user } = useAuthStore()
   return (
      <>
         {!!user ? (
            <SettingsForm initialValue={user} />
         ) : (
            <div className='w-full flex items-center justify-center'>
               <Loading title='Your data is loading' />
            </div>
         )}
      </>
   )
}
