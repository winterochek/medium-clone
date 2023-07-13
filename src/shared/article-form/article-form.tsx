import { FormProvider, useForm } from 'react-hook-form'
import { FormContainer } from '../form-container'
import { ArticleFormInterface } from './types'
import { Button, Input } from '../ui'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './schema'
import { Textarea } from '../ui/textarea'
import { ArticleInterface, SingleArticleResponseInterface } from '../../models'
import { useNavigate } from 'react-router-dom'
import { TOKEN_KEY, useLocalStorage } from '../lib'
import { useMutation } from 'react-query'
import { CreateArticle } from '../../api'
import { Spinner } from '../ui/spinner'
import { UpdateArticle } from '../../api/articles'

type Props = {
   action: 'create' | 'edit'
   slug?: string
   defaultValues?: ArticleInterface
}

export default function ArticleFormComponent({ action, slug, defaultValues }: Props) {
   const form = useForm<ArticleFormInterface>({ resolver: yupResolver(schema) })
   const navigate = useNavigate()
   const { get } = useLocalStorage()
   const onSuccess = (data: SingleArticleResponseInterface) => {
      navigate(`/articles/${data?.article?.slug}`)
   }
   const { mutate, isLoading, isError, error } = useMutation({
      mutationFn: action === 'create' ? CreateArticle : UpdateArticle,
      onSuccess: onSuccess,
   })

   const mutateFn = (data: ArticleFormInterface) => {
      const token = get(TOKEN_KEY)
      if (action === 'create') {
         return mutate({ data, token: get(TOKEN_KEY) })
      } else {
         return mutate({ data, token, slug })
      }
   }

   let btnText = action === 'create' ? 'Publish' : 'Update'

   const isValid = form.formState.isValid
   const isSubmitted = form.formState.isSubmitted
   const disabled = (isSubmitted && !isValid) || isLoading

   return (
      <FormContainer title='Create an article'>
         <FormProvider {...form}>
            <form
               onSubmit={form.handleSubmit(mutateFn)}
               className='flex flex-col gap-2 w-3/5 h-full'
            >
               {isError && <p className='text-red-500 px-2'>{String(error)}</p>}
               <Input field='title' placeholder='title' />
               <Input field='description' placeholder='description' />
               <Textarea field='body' placeholder='body of an article' />
               <Input field='tagList' placeholder='tags' />
               <Button disabled={disabled} type='submit' variant='green' classname='ml-auto w-20'>
                  <div className='w-full h-full flex flex-row items-center justify-center gap-1'>
                     {isLoading && <Spinner width={8} height={8} />}
                     {btnText}
                  </div>
               </Button>
            </form>
         </FormProvider>
      </FormContainer>
   )
}
