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
import { SuspenseLoadingModal } from './shared/suspense-loading-modal'

function App() {
   const queryClient = new QueryClient()
   return (
      <QueryClientProvider client={queryClient}>
         <Routes>
            <Route element={<Layout />}>
               <Route path='/' element={<Feed />} />
               <Route
                  path='/login'
                  element={
                     <Suspense fallback={<SuspenseLoadingModal />}>
                        <Login />
                     </Suspense>
                  }
               />
               <Route
                  path='/register'
                  element={
                     <Suspense fallback={<SuspenseLoadingModal />}>
                        <Register />
                     </Suspense>
                  }
               />
               <Route
                  path='/create'
                  element={
                     <Suspense fallback={<SuspenseLoadingModal />}>
                        <CreateArticle />
                     </Suspense>
                  }
               />
               <Route
                  path='/settings'
                  element={
                     <Suspense fallback={<SuspenseLoadingModal />}>
                        <Settings />
                     </Suspense>
                  }
               />
               <Route
                  path='/articles/:slug'
                  element={
                     <Suspense fallback={<SuspenseLoadingModal />}>
                        <SingleArticle />
                     </Suspense>
                  }
               />
               <Route
                  path='/articles/:slug/edit'
                  element={
                     <Suspense fallback={<SuspenseLoadingModal />}>
                        <EditArticle />
                     </Suspense>
                  }
               />
               <Route
                  path='/profile/:slug'
                  element={
                     <Suspense fallback={<SuspenseLoadingModal />}>
                        <Profile />
                     </Suspense>
                  }
               />
               <Route
                  path='/tag/:slug'
                  element={
                     <Suspense fallback={<SuspenseLoadingModal />}>
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
