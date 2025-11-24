import { useState } from 'react'
import LanguageSelector from '../components/LangSelector.jsx'
import CategoryList from '../components/CategoriaList.jsx'
import useCategories from '../hooks/useCategories'
import { useLang } from '../contexts/LangContext.jsx'

export default function Home() {
 const { selectedLang: lang, setSelectedLang: setLang } = useLang()
  const { categories, loading, error } = useCategories()

  return (
    <div className="min-h-screen from-blue-400 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Selecciona idioma y categoría</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-3">Idioma</label>
          <LanguageSelector value={lang} onChange={setLang} />
        </div>

        {loading && <p className="text-center text-indigo-600 font-semibold py-4">Cargando categorías...</p>}
        {error && <p className="text-center text-red-600 font-semibold bg-red-50 p-4 rounded-lg mb-6">{error.message || error}</p>}
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <CategoryList categories={categories} lang={lang} />
        </div>
      </div>
    </div>
  )
}
