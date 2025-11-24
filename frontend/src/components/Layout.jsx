import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthProvider.jsx'

export default function Layout({ children }) {
  const navigate = useNavigate()
  const { logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/auth')
  }

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px', borderBottom: '1px solid #eee' }}>
        <h3>Chistes App</h3>
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <main style={{ padding: '16px' }}>{children}</main>
    </div>
  )
}
