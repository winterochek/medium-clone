import { useNavigate } from 'react-router-dom'
import { Button } from '../../../shared/ui'

export default function ErrorComponent({ message }: { message: string }) {
   const navigate = useNavigate()
   const handleReturn = () => navigate('/')
   return (
      <>
         <h2 className='text-red-500 mx-auto font-medium text-lg text-center py-2'>{message}🐙</h2>
         <div className='flex flex-col items-center mx-auto'>
            <Button onClick={handleReturn} variant='green'>
               Return
            </Button>
         </div>
      </>
   )
}
