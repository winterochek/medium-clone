import { FormProvider, useForm } from 'react-hook-form'
import { FormContainer } from '../form-container'
import { ArticleFormInterface } from './types'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './schema'
import { SingleArticleResponseInterface } from '../../models'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { CreateArticle } from '../../api'
import { UpdateArticle } from '../../api/articles'
import { UseToken } from '../lib/use-token'
import { ArticleFormLayout } from './article-form-layout'

type Props = {
   action: 'create' | 'edit'
   slug?: string
   defaultValues?: ArticleFormInterface
}

export function ArticleForm({ action, slug, defaultValues }: Props) {
   const form = useForm<ArticleFormInterface>({ resolver: yupResolver(schema), defaultValues })
   const navigate = useNavigate()
   const token = UseToken()
   const onSuccess = (data: SingleArticleResponseInterface) => {
      navigate(`/articles/${data?.article?.slug}`)
   }
   const { mutate, isLoading, isError, error } = useMutation({
      mutationFn: action === 'create' ? CreateArticle : UpdateArticle,
      onSuccess,
   })

   const mutateFn = (data: ArticleFormInterface) => {
      if (!token) return
      if (action === 'create') {
         return mutate({ data, token })
      } else {
         return mutate({ data, token, slug })
      }
   }

   let btnText = action === 'create' ? 'Publish' : 'Update'

   const { isValid } = form.formState
   const { isSubmitted } = form.formState
   const disabled = (isSubmitted && !isValid) || isLoading

   return (
      <FormContainer title='Create an article'>
         <FormProvider {...form}>
            <ArticleFormLayout
               onSubmit={form.handleSubmit(mutateFn)}
               error={String(error)}
               isLoading={isLoading}
               isError={isError}
               disabled={disabled}
               btnText={btnText}
            />
         </FormProvider>
      </FormContainer>
   )
}
