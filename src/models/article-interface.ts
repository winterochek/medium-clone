import { ProfileInterface } from './profile-interface'

export interface ArticleInterface {
   slug: string
   title: string
   description: string
   body: string
   tagList: string[]
   createdAt: string
   updatedAt: string
   favorited: boolean
   favoritesCount: number
   author: ProfileInterface
}

export interface SingleArticleResponseInterface {
   article: ArticleInterface
}

export interface MultipleArticlesResponseInterface {
   articles: ArticleInterface[]
   articlesCount: number
}
