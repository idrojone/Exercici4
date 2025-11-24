import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthProvider.jsx'
import { AuthForm } from '../components/AuthForm.jsx'

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
    <AuthForm
      isLogin={isLogin}
      onSubmit={handleSubmit}
      error={error}
      setIsLogin={setIsLogin}
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
    />
  )
}