import { api } from './api'
import { translate } from './translate.service'

export async function getCategories(lang) {
    // const data = await api.get('/categories')
    const r = await fetch('https://api.chucknorris.io/jokes/categories')

    const data = await r.json();
    console.log(data)
    await Promise.all(data.map(async (name) => {
        name = await translate(name, 'en', lang)
    }));

    // // console.log(response)
    // const data = await response.json()
    // console.log(data)
    return data
}