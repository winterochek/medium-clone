import { Outlet } from 'react-router-dom'
import { TopBar } from '../top-bar'

export default function Layout() {
   return (
      <div className='flex flex-col mx-auto px-8 md:px-16 md:py-8 lg:px-16 h-screen min-h-screen'>
         <TopBar />
         <Outlet />
      </div>
   )
}
