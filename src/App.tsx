import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Routes'
import { Toast } from '@heroui/react'
import AuthContextProvider from './Context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {

  const queryClient = new QueryClient()

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
      <Toast.Provider placement='top end'/>
     <RouterProvider router={router} />
    </AuthContextProvider>
    </QueryClientProvider>
    
    </>
  )
}

export default App
