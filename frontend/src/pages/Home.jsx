import { useState } from 'react'
import LanguageSelector from '../components/LangSelector.jsx'
import CategoryList from '../components/CategoriaList.jsx'
import useCategories from '../hooks/useCategories'

export default function Home() {
  const [lang, setLang] = useState('es')
  const { categories, loading, error } = useCategories()

  return (
    <div>
      <h1>Selecciona idioma y categoría</h1>
      <div>
        <label>Idioma</label>
        <LanguageSelector value={lang} onChange={setLang} />
      </div>
      {loading && <p>Cargando categorías...</p>}
      {error && <p style={{ color: 'red' }}>{error.message || error}</p>}
      <CategoryList categories={categories} lang={lang} />
    </div>
  )
}
