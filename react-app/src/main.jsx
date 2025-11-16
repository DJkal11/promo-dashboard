import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import './index.css'
import App from './App.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App />, children: [{ index: true, element: <Dashboard /> }] }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
