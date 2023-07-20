import { ReactNode, FC, useEffect } from 'react'
import { useAuthStore } from '../../shared/lib'
const AuthProvider: FC<{ children: ReactNode; isLoggedIn: boolean }> = ({
   children,
   isLoggedIn,
}) => {
   const { login } = useAuthStore()
   useEffect(() => {
      if (!isLoggedIn) return
      login({
         username: 'USER',
         email: 'user@mail.com',
         token: '123',
         image: 'https://api.realworld.io/images/demo-avatar.png',
      })
   }, [])
   return <div> {children} </div>
}

export const withAuthStore = (isLoggedIn: boolean) => (Story: FC) =>
   (
      <AuthProvider isLoggedIn={isLoggedIn}>
         <Story />
      </AuthProvider>
   )
