import { api } from './api'

export async function getCategories() {
    // const data = await api.get('/categories')

    const response = await fetch('https://api.chucknorris.io/jokes/categories')
    const data = await response.json()
    // console.log(data)
    return data
}