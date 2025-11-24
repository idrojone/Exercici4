import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getJokes } from '../services/jokes.service'
import JokesList from '../components/JokesList.jsx'

export default function Jokes() {
  const { category, lang } = useParams()
  const [jokes, setJokes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchJokes() {
      setLoading(true)
      setError(null)
      try {
        const data = await getJokes(category, lang)
        // API returns { category, jokes }
        setJokes(data.jokes || data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    if (category && lang) fetchJokes()
  }, [category, lang])

  return (
    <div className="min-h-screen from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Chistes de: <span className="text-indigo-600">{category}</span> ({lang})
        </h1>
        
        <Link 
          to="/" 
          className="inline-block mb-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
        >
          ← Volver
        </Link>

        {loading && (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600">Cargando chistes...</p>
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error.message || error}
          </div>
        )}
        
        <JokesList jokes={jokes} />
      </div>
    </div>
  )
}
