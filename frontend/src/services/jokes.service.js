import { api } from './api'

export async function getJokes(categoryName, lang = 'es') {
  const data = await api.get(`/categories/${encodeURIComponent(categoryName)}/jokes/${lang}`)
  return data
}