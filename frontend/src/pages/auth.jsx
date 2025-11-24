import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthProvider.jsx'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { login } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    try {
      if (isLogin) {
        await login({ email, password })
      } else {
        const { register } = await import('../services/auth.service')
        await register({ name, email, password })
        await login({ email, password })
      }
      navigate('/')
    } catch (err) {
      setError(err.message || err.toString())
    }
  }

  return (
    <div className="auth-page">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <div>
        <button onClick={() => setIsLogin(true)} disabled={isLogin}>Login</button>
        <button onClick={() => setIsLogin(false)} disabled={!isLogin}>Register</button>
      </div>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label>Nombre</label>
            <input value={name} onChange={e => setName(e.target.value)} />
          </div>
        )}
        <div>
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" />
        </div>
        <div>
          <label>Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
        </div>
        <button type="submit">{isLogin ? 'Entrar' : 'Registrar'}</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}