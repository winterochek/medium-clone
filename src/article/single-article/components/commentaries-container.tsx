import { useMutation, useQuery } from 'react-query'
import { CreateComment, DeleteComment, GetComments } from '../../../api/comments'
import { Loading } from '../../../shared/loading'
import { Comments } from '../../../shared/comments'
import { CommentForm } from '../../../shared/comment-form'
import { TOKEN_KEY, useAuthStore, useLocalStorage } from '../../../shared/lib'
import { useCallback, useState } from 'react'
import { CommentFormInterface } from '../../../shared/comment-form/types'
import { CommentInterface } from '../../../models'
import { Link } from 'react-router-dom'

export default function Commentaries({ slug }: { slug: string }) {
   const [comments, setComments] = useState<CommentInterface[]>([])
   const { user } = useAuthStore()
   const { isLoading, isError, error, isSuccess } = useQuery({
      queryKey: ['comments', slug],
      queryFn: () => GetComments({ token: get(TOKEN_KEY), slug }),
      onSuccess: data => setComments(() => (data?.comments).sort((a, b) => b?.id - a?.id)),
   })
   const { get } = useLocalStorage()
   const { mutate: deleteMutation } = useMutation({ mutationFn: DeleteComment })
   const {
      mutate: createMutation,
      isLoading: isLoadingCreate,
      isError: isErrorCreate,
      error: errorCreate,
   } = useMutation({ mutationFn: CreateComment })

   const handleCreate = useCallback((data: CommentFormInterface) => {
      if (!slug || !user) return
      createMutation(
         { slug, token: get(TOKEN_KEY), comment: data },
         {
            onSuccess: ({ comment }) => {
               setComments(prev => [comment, ...prev])
            },
         }
      )
   }, [])

   const handleDelete = useCallback((_id: number) => {
      const token = get(TOKEN_KEY)
      const id = String(_id)
      deleteMutation({ slug, token, id })
      setComments(prev => [...prev.filter(com => com.id !== _id)])
   }, [])

   if (isLoading || isLoadingCreate) {
      return <Loading title='Commentaries is loading' />
   }

   if (isError) {
      return <h2 className='text-red-500 font-medium text-center'>{String(error)}</h2>
   }
   if (isSuccess) {
      return (
         <>
            <Comments
               comments={comments}
               handleDelete={handleDelete}
               ownUsername={user?.username}
            />
            {!!user ? (
               <CommentForm
                  isLoading={isLoadingCreate}
                  isError={isErrorCreate}
                  error={String(errorCreate)}
                  mutateFn={handleCreate}
               />
            ) : (
               <div className=''>
                  <p className='px-2 text-gray-500'>
                     <Link
                        to={'/login'}
                        className='text-black underline hover:text-green-500 hover:cursor-pointer'
                     >
                        Sign in
                     </Link>{' '}
                     to leave commentaries 🐷
                  </p>
               </div>
            )}
         </>
      )
   }

   return null
}
