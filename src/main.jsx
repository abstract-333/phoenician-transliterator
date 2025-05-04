import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PhoenicianTransliterator from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PhoenicianTransliterator />
  </StrictMode>,
)
