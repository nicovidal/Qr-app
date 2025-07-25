import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QrApp } from './QrApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QrApp />
  </StrictMode>,
)
