import { Link, useLocation } from 'react-router-dom'
import { NavItem } from './nav-item'
import { useAuthStore } from '../lib'
import { useQuery } from 'react-query'
import { UserInfo } from '../../api'
import { UserInterface } from '../../models'
import { UseToken } from '../lib/use-token'
import { TopBarLayout } from './top-bar-layout'

export default function TopBarComponent() {
   const { pathname } = useLocation()
   const { user, login } = useAuthStore()
   const token = UseToken()

   const onSuccess = (data: unknown) => {
      const { user } = data as { user: UserInterface }
      login(user)
   }

   const { isLoading } = useQuery({
      queryKey: ['user-info', user?.username],
      queryFn: () => UserInfo(token),
      onSuccess: onSuccess,
      enabled: !!token,
   })

   const getScenario = () => {
      if (isLoading) return 'loading'
      if (!!user) return 'loggedIn'
      return 'idle'
   }

   return (
      <TopBarLayout
         logo={
            <Link className='flex items-center justify-center' to={'/'}>
               <span className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight pb-2 text-green-500 font-semibold flex justify-center items-center'>
                  medium
               </span>
            </Link>
         }
         home={<NavItem isActive={pathname === '/'} to={'/'} title={'Home'} />}
         profile={
            <NavItem
               isActive={pathname === `/profile/${user?.username}`}
               to={`/profile/${user?.username}`}
               title={`${'Profile'}`}
            />
         }
         scenario={getScenario()}
         activePath = {pathname}
      />
   )
}
