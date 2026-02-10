import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from '@/theme/ThemeContext'
import { LoadingProvider } from '@/context/LoadingContext'
import { AuthProvider } from '@/context/AuthContext'
import { ToastProvider } from '@/components/ui'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <LoadingProvider>
        <AuthProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </AuthProvider>
      </LoadingProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
