import { useNavigate, useParams } from 'react-router-dom'
import { ArticleForm } from '../../shared/article-form'
import { TOKEN_KEY, useAuthStore, useLocalStorage } from '../../shared/lib'
import { Loading } from '../../shared/loading'
import { useQuery } from 'react-query'
import { ParticularArticle } from '../../api/articles'
import { ArticleInterface } from '../../models'
import { ArticleFormInterface } from '../../shared/article-form/types'

export default function EditArticlePage() {
   const { user } = useAuthStore()
   const { slug } = useParams()
   const navigate = useNavigate()
   const { get } = useLocalStorage()
   const { data } = useQuery({
      queryKey: [],
      queryFn: () => ParticularArticle({ slug: slug!, token: get(TOKEN_KEY) }),
   })
   const loggedIn = !!user
   const article = data?.article || null
   const isAuthor = article?.author?.username === user?.username
   const getDefaultValues = (article: ArticleInterface) => {
      return {
         body: article.body,
         title: article.title,
         description: article.description,
         tagList: article.tagList.join(' '),
      } as ArticleFormInterface
   }
   if (article && loggedIn && isAuthor)
      return <ArticleForm action='edit' defaultValues={getDefaultValues(article)} />
   if (article && !isAuthor) navigate('/')
   return <Loading title='please wait' />
}
