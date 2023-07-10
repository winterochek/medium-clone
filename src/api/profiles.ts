import { ProfileInterface } from '../models'
import { baseURL } from './base-url'

export async function Profile({
   username,
   token,
}: {
   username: string
   token: string
}): Promise<{ profile: ProfileInterface }> {
   const url = `${baseURL}/profiles/${username}`
   const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
   })
   if (!response.ok) {
      throw new Error(`Fetching of ${username} info failed`)
   }
   return response.json()
}

export async function Follow({
   username,
   token,
}: {
   username: string
   token: string
}): Promise<{ profile: ProfileInterface }> {
   const url = `${baseURL}/profiles/${username}/follow`
   const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
   })
   if (!response.ok) {
      throw new Error(`Following of ${username} failed`)
   }
   return response.json()
}

export async function UnFollow({
   username,
   token,
}: {
   username: string
   token: string
}): Promise<{ profile: ProfileInterface }> {
   const url = `${baseURL}/profiles/${username}/follow`
   const response = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
   })
   if (!response.ok) {
      throw new Error(`Unfollowing of ${username} failed`)
   }
   return response.json()
}
