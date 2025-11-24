export function AuthForm({ isLogin, onSubmit, error, setIsLogin, name, setName, email, setEmail, password, setPassword }) {
    return (
        <div className="min-h-screen from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    {isLogin ? 'Login' : 'Register'}
                </h2>
                <div className="flex gap-4 mb-6">
                    <button 
                        type="button" 
                        onClick={() => setIsLogin(true)} 
                        disabled={isLogin}
                        className="flex-1 py-2 px-4 rounded-lg font-semibold transition-colors disabled:bg-indigo-600 disabled:text-white bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                        Login
                    </button>
                    <button 
                        type="button" 
                        onClick={() => setIsLogin(false)} 
                        disabled={!isLogin}
                        className="flex-1 py-2 px-4 rounded-lg font-semibold transition-colors disabled:bg-indigo-600 disabled:text-white bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                        Register
                    </button>
                </div>
                <form onSubmit={onSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                            <input value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors mt-6">
                        {isLogin ? 'Entrar' : 'Registrar'}
                    </button>
                </form>
                {error && <p className="mt-4 text-red-600 text-sm font-medium text-center">{error}</p>}
            </div>
        </div>
    )
}