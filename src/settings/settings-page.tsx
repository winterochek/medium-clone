import { useAuthStore } from '../shared/lib'
import { Loading } from '../shared/loading'
import { Redirect } from '../shared/redirect'
import { SettingsForm } from './components'

export default function SettingsPage() {
   const { user } = useAuthStore()
   const loggedIn = !!user
   if (loggedIn) return <SettingsForm initialValue={user} />
   if (!loggedIn) return <Redirect title='have to set something 🦒' />
   return <Loading title='developing your status' />
}
