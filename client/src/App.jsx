import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CMSProvider } from './context/CMSContext'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CMSProvider>
          <AppRoutes />
        </CMSProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
