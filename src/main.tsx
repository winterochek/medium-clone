import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary, ErrorFallback } from './shared/error-boundary'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <BrowserRouter>
         <ErrorBoundary fallback={<ErrorFallback />}>
            <App />
         </ErrorBoundary>
      </BrowserRouter>
   </React.StrictMode>
)
