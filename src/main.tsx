import React from 'react'
import ReactDOM from 'react-dom/client'
import Profile from './components/profile/Profile.tsx'
import Background from './components/background/Background.tsx'
import Skills from './components/skills/Skills.tsx'
import Links from './components/links/Links.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Profile />
    <Background />
    <Skills />
    <Links />
  </React.StrictMode>,
)
