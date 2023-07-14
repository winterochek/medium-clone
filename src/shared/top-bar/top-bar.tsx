import { Link, useLocation } from 'react-router-dom'
import { NavItem } from './nav-item'
import { useAuthStore } from '../lib'
import { useQuery } from 'react-query'
import { UserInfo } from '../../api'
import { UserInterface } from '../../models'
import { Spinner } from '../ui/spinner'
import { UseToken } from '../lib/use-token'

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

   let content: JSX.Element | null

   if (!!user && !isLoading) {
      content = (
         <>
            <NavItem isActive={pathname === '/create'} to={'/create'} title={'Publish'} />
            <NavItem isActive={pathname === '/settings'} to={'/settings'} title={'Settings'} />
            <NavItem
               isActive={pathname === `/profile/${user.username}`}
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

   if (isLoading) {
      if (pathname === '/login' || pathname === '/register') {
         content = null
      } else {
         content = <Spinner classname='w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7' />
      }
   }

   return (
      <div className='flex flex-row justify-between items-center h-20 pt-2 sm:py-2'>
         <Link className='flex items-center justify-center' to={'/'}>
            <span className='text-4xl lg:text-5xl leading-tight pb-2 text-green-500 font-semibold flex justify-center items-center'>
               medium
            </span>
         </Link>
         <nav className='flex flex-row gap-3 items-center sm:text-base md:text-lg lg:text-xl'>
            <NavItem isActive={pathname === '/'} to={'/'} title={'Home'} />
            <>{content!}</>
         </nav>
      </div>
   )
}
