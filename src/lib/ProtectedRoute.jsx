import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#08080a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(245, 245, 240, 0.4)',
        fontFamily: "'Cabinet Grotesk', system-ui, sans-serif",
        fontSize: 14,
      }}>
        Cargando...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
