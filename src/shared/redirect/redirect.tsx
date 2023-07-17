import { Link } from 'react-router-dom'

export function Redirect({ title, action }: { title: string; action?: string }) {
   return (
      <p className='text-gray-500 text-center md:text-base lg:text-lg'>
         you have to{' '}
         <Link
            className='text-black hover:text-green-500 underline hover:cursor-pointer md:text-base lg:text-lg'
            to={'/login'}
         >
            {action || 'sign in'}
         </Link>{' '}
         to {title}
      </p>
   )
}
