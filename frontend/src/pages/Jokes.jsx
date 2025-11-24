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
    <div>
      <h1>Chistes de: {category} ({lang})</h1>
      <Link to="/">Volver</Link>
      {loading && <p>Cargando chistes...</p>}
      {error && <p style={{ color: 'red' }}>{error.message || error}</p>}
      <JokesList jokes={jokes} />
    </div>
  )
}
