import { Link, useLocation } from 'react-router-dom'
import { NavItem } from './nav-item'
import { TOKEN_KEY, useAuthStore, useLocalStorage } from '../lib'
import { useQuery } from 'react-query'
import { UserInfo } from '../../api'
import { UserInterface } from '../../models'

export default function TopBarComponent() {
   const { pathname } = useLocation()
   const { user, login } = useAuthStore()
   const { get } = useLocalStorage()

   const onSuccess = (data: unknown) => {
      const { user } = data as { user: UserInterface }
      login(user)
   }

   const { isLoading } = useQuery({
      queryKey: ['user-info', user?.username],
      queryFn: () => UserInfo(get(TOKEN_KEY)),
      onSuccess: onSuccess,
   })

   let content: JSX.Element | null

   if (!!user && !isLoading) {
      content = (
         <>
            <NavItem isActive={pathname === '/create'} to={'/create'} title={'Publish'} />
            <NavItem isActive={pathname === '/settings'} to={'/settings'} title={'Settings'} />
            <NavItem
               isActive={pathname.includes('profile')}
               to={`/profile/${user.username}`}
               title={`${'Profile'}`}
            />
         </>
      )
   }

   if (!user && !isLoading) {
      if (pathname === '/login' || pathname === '/register') {
         content = null
      } else {
         content = (
            <>
               <NavItem to={'/login'} title={'Sign in'} />
            </>
         )
      }
   }
   return (
      <div className='flex flex-row justify-between items-center h-14 py-2'>
         <Link className='flex items-center justify-center' to={'/'}>
            <span className='text-3xl text-green-500 font-semibold flex justify-center items-center'>
               medium
            </span>
         </Link>
         <nav className='flex flex-row gap-2 items-center'>
            <NavItem isActive={pathname === '/'} to={'/'} title={'Home'} />
            <>{content!}</>
         </nav>
      </div>
   )
}
