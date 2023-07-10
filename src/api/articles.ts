import { ArticleFormInterface } from './../shared/article-form/types'
import { MultipleArticlesResponseInterface, SingleArticleResponseInterface } from '../models'
import { baseURL } from './base-url'
import { LIMIT } from '../shared/lib'

export async function Articles({
   onlyPersonal,
   token,
   page = 1,
}: {
   onlyPersonal: boolean
   token?: string
   page: number
}): Promise<MultipleArticlesResponseInterface> {
   const limit = LIMIT
   const offset = page * limit - 10
   const url = onlyPersonal
      ? `${baseURL}/articles/feed`
      : `${baseURL}/articles?limit=${limit}&offset=${offset}`
   const response = await fetch(url, {
      method: 'GET',
      headers: {
         Authorization: `Token ${token || ''}`,
      },
   })
   if (!response.ok) {
      throw new Error('Fetching articles failed')
   }
   return response.json()
}

export async function CreateArticle({
   data,
   token,
}: {
   data: ArticleFormInterface
   token: string
}): Promise<SingleArticleResponseInterface> {
   const article = { ...data, tagList: [...data.tagList.split(' ')] }
   const url = `${baseURL}/articles`
   const response = await fetch(url, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Token ${token || ''}`,
      },
      body: JSON.stringify({ article }),
   })
   if (!response.ok) {
      throw new Error('Creating article failed')
   }

   return response.json()
}

export async function UpdateArticle({
   data,
   token,
   slug,
}: {
   data: ArticleFormInterface
   token: string
   slug?: string
}): Promise<SingleArticleResponseInterface> {
   const article = { ...data, tagList: [...data.tagList.split(' ')] }
   const url = `${baseURL}/articles/${slug}`
   const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token || ''}` },
      body: JSON.stringify({ article }),
   })
   if (!response.ok) {
      throw new Error('Updating article failed')
   }

   return response.json()
}

export async function LikeOrDislikeArticle({
   action,
   slug,
   token,
}: {
   action: 'like' | 'dismiss'
   slug: string
   token: string
}) {
   const url = `${baseURL}/articles/${slug}/favorite`
   if (action === 'like') {
      const response = await fetch(url, {
         method: 'POST',
         headers: {
            Authorization: `Token ${token || ''}`,
         },
      })
      if (!response.ok) {
         throw new Error('Like action failed')
      }
      return response.json()
   } else {
      const response = await fetch(url, {
         method: 'DELETE',
         headers: {
            Authorization: `Token ${token || ''}`,
         },
      })
      if (!response.ok) {
         throw new Error('Like dismiss action failed')
      }
      return response.json()
   }
}
