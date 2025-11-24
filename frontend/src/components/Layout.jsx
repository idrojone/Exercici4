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
      <header className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Chistes App</h3>
        <div>
          <button onClick={handleLogout} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Logout
          </button>
        </div>
      </header>
      <main className="p-4">{children}</main>
    </div>
  )
}
