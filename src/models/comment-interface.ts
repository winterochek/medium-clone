import { ProfileInterface } from './profile-interface'

export interface CommentInterface {
   id: number
   createdAt: string
   updatedAt?: string
   body: string
   author: ProfileInterface
}

export interface MultipleCommentsResponseInterface {
   comments: CommentInterface[]
}
