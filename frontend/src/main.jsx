import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="98913510610-ltukf9sujpc3q7irgl5c9thiub0kkp2n.apps.googleusercontent.com">
       <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)


