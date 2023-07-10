import { create } from 'zustand'
import { UserInterface } from '../../models'

interface AuthStoreInterface {
   user: UserInterface | null
   login: (user: UserInterface) => void
   logout: () => void
}

export const useAuthStore = create<AuthStoreInterface>(set => ({
   user: null,
   login: (user: UserInterface) => set(state => ({ ...state, user })),
   logout: () => set(state => ({ ...state, user: null })),
}))
