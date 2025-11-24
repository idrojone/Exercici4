export function AuthForm({ isLogin, onSubmit, error, setIsLogin, name, setName, email, setEmail, password, setPassword }) {
  return (
        <>
            <div className="auth-page">
                <h2>{isLogin ? 'Login' : 'Register'}</h2>
                
            </div>
        </>
    )
}