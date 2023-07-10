import { LoginFormInterface } from '../auth/login'
import { RegisterFormInterface } from '../auth/register'
import { ServerErrorsInterface, UserInterface } from '../models'
import { baseURL } from './base-url'

export async function UserLogin(
   data: LoginFormInterface
): Promise<{ user: UserInterface } | ServerErrorsInterface> {
   const url = `${baseURL}/users/login`
   const response = await fetch(url, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: data }),
   })
   if (!response.ok) {
      throw new Error('Authorization failed')
   }
   return response.json()
}

export async function UserRegister(data: RegisterFormInterface): Promise<UserInterface> {
   const url = `${baseURL}/users`
   const response = await fetch(url, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: data }),
   })
   if (!response.ok) {
      throw new Error('Registration failed')
   }
   return response.json()
}

export async function UserInfo(
   token?: string
): Promise<{ user: UserInterface } | ServerErrorsInterface> {
   const url = `${baseURL}/user`

   const response = await fetch(url, {
      method: 'GET',
      headers: {
         Authorization: `Token ${token}`,
      },
   })

   if (!response.ok) {
      throw new Error('Fetching user info failed')
   }
   return response.json()
}

export async function UserInfoUpdate({
   data,
   token,
}: {
   data: Partial<UserInterface>
   token?: string
}): Promise<UserInterface> {
   const url = `${baseURL}/user`
   const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
      body: JSON.stringify({ user: data }),
   })

   if (!response.ok) {
      throw new Error('Updating user info failed')
   }
   return response.json()
}
