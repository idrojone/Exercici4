import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthProvider.jsx'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/auth" replace />
  return children
}
