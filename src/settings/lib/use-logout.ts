import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../shared/lib'
import { UseRemoveToken } from '../../shared/lib/use-token'

export function UseLogout() {
   const remove = UseRemoveToken()
   const { logout } = useAuthStore()
   const navigate = useNavigate()
   return () => {
      remove()
      logout()
      navigate('/')
   }
}
