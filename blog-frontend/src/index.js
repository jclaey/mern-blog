import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import { AuthProvider } from "./context/AuthContext.js"
import 'bootstrap/dist/css/bootstrap.min.css'

const root = createRoot(document.getElementById('root'))
root.render(
    <AuthProvider>
        <App />
    </AuthProvider>
)