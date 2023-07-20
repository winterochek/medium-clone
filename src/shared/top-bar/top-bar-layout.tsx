import { ReactNode } from 'react'
import { Spinner } from '../ui/spinner'
import { NavItem } from './nav-item'

export function TopBarLayout({
   logo,
   home,
   profile,
   scenario,
   activePath,
}: {
   logo: ReactNode
   home: ReactNode
   profile: ReactNode
   scenario: 'idle' | 'loading' | 'loggedIn'
   activePath: string
}) {
   const getNavLinks = () => {
      if (scenario === 'idle')
         return (
            <>
               <NavItem to={'/login'} title={'Sign in'} />
            </>
         )
      if (scenario === 'loading')
         return (
            <>
               <Spinner classname='w-5 h-5 sm:w-6 sm:h-6' />
            </>
         )
      if (scenario === 'loggedIn')
         return (
            <>
               <NavItem isActive={activePath === '/create'} to={'/create'} title={'Publish'} />
               <NavItem isActive={activePath === '/settings'} to={'/settings'} title={'Settings'} />
               {profile}
            </>
         )
   }
   return (
      <div className='flex flex-row justify-between items-center h-20 py-2 md:py-4'>
         {logo}
         <nav className='flex flex-row gap-3 items-center sm:text-base md:text-lg lg:text-xl'>
            {home}
            {getNavLinks()}
         </nav>
      </div>
   )
}
