import { api } from './api'

export async function getJokes(categoryName, lang = 'es') {
  // const data = await api.get(`/categories/${encodeURIComponent(categoryName)}/jokes/${lang}`)
  const jokes = []
  for (let i = 0; i < 2; i++) {
    jokes.push(await fetch(`https://api.chucknorris.io/jokes/random?category=${encodeURIComponent(categoryName)}`)
    .then(res => res.json()))
  }

  if (lang === 'es') {
    console.log('Translating jokes to Spanish...');
    
    const payload = {
      q: jokes.map(j => j.value),
      source: 'auto',
      target: 'es',
      format: 'text'
    }

    try {
      const res = await fetch('http://localhost:5001/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      return (data && data.translatedText) ?? '';
    } catch (err) {
      console.error(`LibreTranslate error: ${err.message}`);
      return jokes;
    }
  } else {
    return jokes;
  }

}