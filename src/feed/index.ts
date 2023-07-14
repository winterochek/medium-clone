import { lazy } from 'react'
import { FeedArticle } from './components/feed-article'

const Feed = lazy(() => import('./feed-page'))

export { FeedArticle, Feed }

