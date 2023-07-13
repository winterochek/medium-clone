import { Link } from 'react-router-dom'

export default function RedirectComponent({ title, action }: { title: string; action?: string }) {
   return (
      <p className='text-gray-500 text-center'>
         you have to{' '}
         <Link
            className='text-black hover:text-green-500 underline hover:cursor-pointer'
            to={'/login'}
         >
            {action || 'sign in'}
         </Link>{' '}
         to {title}
      </p>
   )
}
