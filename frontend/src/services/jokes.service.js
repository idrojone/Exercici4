import { api } from './api'
import { translate } from './translate.service'

export async function getJokes(categoryName, lang = 'es') {
  // const data = await api.get(`/categories/${encodeURIComponent(categoryName)}/jokes/${lang}`)
  // return data;
  const jokes = []
  for (let i = 0; i < 2; i++) {
    jokes.push(await fetch(`https://api.chucknorris.io/jokes/random?category=${encodeURIComponent(categoryName)}`)
      .then(res => res.json()))
  }
  await api.post(`/auth/log`, {
    jokes,
    lang
  })
  return translate(jokes.map(j => j.value), 'en', lang)
}