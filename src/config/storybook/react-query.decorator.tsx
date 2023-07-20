import { ReactNode, FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const QueryProvider: FC<{ children: ReactNode }> = ({ children }) => {
   const queryClient = new QueryClient()
   return <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>
}

export const withReactQuery = () => (Story: FC) =>
   (
      <QueryProvider>
         <Story />
      </QueryProvider>
   )
