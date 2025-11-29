import { api, setAuthToken } from './api';

export async function register({ name, email, password }) {
    const data = await api.post('/auth/register', { name, email, password });
    return data;
}

export async function login({ email, password }) {
    const data = await api.post('/auth/login', { email, password });
    console.log('Login data:', data.accessToken);
    if (data?.accessToken) {
        localStorage.setItem('token', data.accessToken);
        setAuthToken(data.accessToken);
    }
    return data;
}

export async function logout() {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('selectedLang');
    setAuthToken(null);
}