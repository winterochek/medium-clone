import { CommentInterface } from '../../models'
import { Avatar, Button } from '../ui'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

export default function CommentsComponent({
   comments,
   handleDelete,
   ownUsername,
}: {
   comments: CommentInterface[]
   handleDelete: (_id: number) => void
   ownUsername?: string
}) {
   const date = (createdAt: string) => format(new Date(createdAt || ''), 'dd-MM-yyyy')
   const isOwn = (username: string) => ownUsername === username

   return (
      <div className='flex flex-col gap-3'>
         {comments.map(({ id, body, author, createdAt }) => (
            <div
               key={id}
               className='flex flex-col border-2 border-gray-300 rounded-lg overflow-hidden shadow'
            >
               <div className='bg-white px-2 py-2 text-black text-base'>{body}</div>
               <div className='flex bg-gray-300 flex-row items-center justify-start px-2 py-2 gap-2'>
                  <Link to={`/profile/${author.username}`}>
                     <Avatar width={20} height={20} src={author.image} alt={author.username} />
                  </Link>
                  <Link to={`/profile/${author.username}`} className='text-green-500 text-base'>
                     {author.username}
                  </Link>
                  <span className='text-base text-black'>{date(createdAt)}</span>
                  {isOwn(author.username) && (
                     <Button
                        variant='outline'
                        classname='ml-auto w-18'
                        onClick={() => handleDelete(id)}
                     >
                        delete
                     </Button>
                  )}
               </div>
            </div>
         ))}
      </div>
   )
}
