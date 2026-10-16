import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Routes'
import { Toast } from '@heroui/react'
import AuthContextProvider from './Context/AuthContext'

function App() {

  return (
    <>
    <AuthContextProvider>
      <Toast.Provider placement='top end'/>
     <RouterProvider router={router} />
    </AuthContextProvider>
    
    </>
  )
}

export default App
