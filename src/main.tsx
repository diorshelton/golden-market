import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import ProfilePage from './Profile.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Login/>
    <Register />
    <ProfilePage/>
  </StrictMode>,
)
