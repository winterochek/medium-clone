import { Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Feed } from './feed'
import { Login, Register } from './auth'
import { CreateArticle, EditArticle, SingleArticle } from './article'
import { Settings } from './settings'
import { Profile } from './profile'
import { Layout } from './shared/layout'

function App() {
   const queryClient = new QueryClient()
   return (
      <QueryClientProvider client={queryClient}>
         <Routes>
            <Route element={<Layout />}>
               <Route path='/' element={<Feed />} />
               <Route path='/login' element={<Login />} />
               <Route path='/register' element={<Register />} />
               <Route path='/create' element={<CreateArticle />} />
               <Route path='/settings' element={<Settings />} />
               <Route path='/articles/:slug' element={<SingleArticle />} />
               <Route path='/articles/:slug/edit' element={<EditArticle />} />
               <Route path='/profile/:slug' element={<Profile />} />
            </Route>
         </Routes>
      </QueryClientProvider>
   )
}

export default App
