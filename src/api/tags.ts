import { baseURL } from './base-url'

export async function Tags(): Promise<{ tags: string[] }> {
   const url = `${baseURL}/tags`
   const response = await fetch(url)
   if (!response.ok) {
      throw new Error('Fetching tags failed')
   }
   return response.json()
}
