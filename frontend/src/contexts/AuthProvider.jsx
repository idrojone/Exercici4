import { createContext, useContext, useEffect, useState } from 'react'
import { setAuthToken } from '../services/api'
import { login as loginService, logout as logoutService } from '../services/auth.service'
import Swal from 'sweetalert2'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  useEffect(() => {
    setAuthToken(token)
    if (!token) setUser(null)
  }, [token])

  async function login(credentials) {
    const data = await loginService(credentials)
    const tokenFromServer = data?.accessToken || data?.token
    if (tokenFromServer) {
      setToken(tokenFromServer)
      if (data.user) setUser(data.user)
    }
    return data
  }

  async function logout() {
    try {
      await logoutService()
    } catch (err) {
      console.error('Logout error:', err)
      Swal.fire('Error', 'Logout fallido', 'error')
    }
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
