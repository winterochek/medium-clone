import { useParams } from 'react-router-dom'

export default function SingleArticlePage() {
   const { slug: articleSlug } = useParams();
   return <div>Single article page. Exactly {articleSlug} article</div>
}
