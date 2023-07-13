import { ArticleForm } from '../../shared/article-form'
import { useAuthStore } from '../../shared/lib'
import { Loading } from '../../shared/loading'
import { Redirect } from '../../shared/redirect'

export default function CreateArticlePage() {
   const { user } = useAuthStore()
   const loggedIn = !!user
   if (loggedIn) return <ArticleForm action={'create'} />
   if (!loggedIn) return <Redirect title='publish articles 🦛' />
   return <Loading title='developing your status' />
}
