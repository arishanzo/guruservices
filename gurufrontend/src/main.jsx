import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="5169959013-nfuo8m6smgqmqarhgvsb5hcp6acisv0f.apps.googleusercontent.com">
      <AuthProvider>
    <App />
    </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
