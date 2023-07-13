import { CommentInterface, MultipleCommentsResponseInterface } from '../models'
import { baseURL } from './base-url'

export async function GetComments({
   token,
   slug,
}: {
   token: string
   slug: string
}): Promise<MultipleCommentsResponseInterface> {
   const url = `${baseURL}/articles/${slug}/comments`
   const response = await fetch(url, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Token ${token || ''}`,
      },
   })
   if (!response.ok) {
      throw new Error('Fetching comments failed')
   }
   return response.json()
}

export async function CreateComment({
   slug,
   token,
   comment,
}: {
   slug: string
   token: string
   comment: any
}): Promise<{ comment: CommentInterface }> {
   const url = `${baseURL}/articles/${slug}/comments`
   const response = await fetch(url, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Token ${token || ''}`,
      },
      body: JSON.stringify({ comment }),
   })

   if (!response.ok) {
      throw new Error('Creating comment failed')
   }

   return response.json()
}

export async function DeleteComment({
   slug,
   token,
   id,
}: {
   slug: string
   token: string
   id: string
}) {
   const url = `${baseURL}/articles/${slug}/comments/${id}`
   const response = await fetch(url, {
      method: 'DELETE',
      headers: {
         Authorization: `Token ${token || ''}`,
      },
   })

   if (!response.ok) {
      throw new Error('Deleting comment failed')
   }

   return response.json()
}
