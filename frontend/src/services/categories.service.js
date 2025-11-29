import { api } from './api'
import { translate } from './translate.service'

export async function getCategories(lang) {
    const r = await fetch('https://api.chucknorris.io/jokes/categories')

    const data = await r.json();
    await Promise.all(data.map(async (name) => {
        const id = name
        name = await translate(name, 'en', lang)
        data.push({ id, name })
    }));
    return data.filter((cat) => {
        return typeof cat === 'object' && cat !== null;
    })
}