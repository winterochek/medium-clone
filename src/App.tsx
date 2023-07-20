import { Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Feed } from './feed'
import { Login, Register } from './auth'
import { CreateArticle, EditArticle, SingleArticle } from './article'
import { Settings } from './settings'
import { Profile } from './profile'
import { Layout } from './shared/layout'
import { TagFeed } from './tag-feed'
import { Suspense } from 'react'
import { SuspenseLoading } from './shared/suspense-loading-modal'

function App() {
   const queryClient = new QueryClient()
   if (Math.random() > 0.5) {
      throw new Error('bugaga')
   }
   return (
      <QueryClientProvider client={queryClient}>
         <Routes>
            <Route element={<Layout />}>
               <Route path='/' element={<Feed />} />
               <Route
                  path='/login'
                  element={
                     <Suspense fallback={<SuspenseLoading />}>
                        <Login />
                     </Suspense>
                  }
               />
               <Route
                  path='/register'
                  element={
                     <Suspense fallback={<SuspenseLoading />}>
                        <Register />
                     </Suspense>
                  }
               />
               <Route
                  path='/create'
                  element={
                     <Suspense fallback={<SuspenseLoading />}>
                        <CreateArticle />
                     </Suspense>
                  }
               />
               <Route
                  path='/settings'
                  element={
                     <Suspense fallback={<SuspenseLoading />}>
                        <Settings />
                     </Suspense>
                  }
               />
               <Route
                  path='/articles/:slug'
                  element={
                     <Suspense fallback={<SuspenseLoading />}>
                        <SingleArticle />
                     </Suspense>
                  }
               />
               <Route
                  path='/articles/:slug/edit'
                  element={
                     <Suspense fallback={<SuspenseLoading />}>
                        <EditArticle />
                     </Suspense>
                  }
               />
               <Route
                  path='/profile/:slug'
                  element={
                     <Suspense fallback={<SuspenseLoading />}>
                        <Profile />
                     </Suspense>
                  }
               />
               <Route
                  path='/tag/:slug'
                  element={
                     <Suspense fallback={<SuspenseLoading />}>
                        <TagFeed />
                     </Suspense>
                  }
               />
            </Route>
         </Routes>
      </QueryClientProvider>
   )
}

export default App
