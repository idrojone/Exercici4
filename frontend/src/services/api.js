import { API_BASE_URL } from '../utils/constants';

export const api = {
    
    defaults: { headers: { common: { 'Content-Type': 'application/json' } } },

    async request(path, { method = 'GET', body, headers = {}, ...rest } = {}) {
        const url = `${API_BASE_URL}${path}`;
        const init = {
            method,
            headers: { ...this.defaults.headers.common, ...headers },
            ...rest
        };

        if (body && typeof body === 'object' && !(body instanceof FormData)) {
            init.body = JSON.stringify(body);
        }

        const res = await fetch(url, init);
        const ct = res.headers.get('content-type') || '';
        const data = ct.includes('application/json') ? await res.json() : await res.text();

        if (!res.ok) {
            const err = new Error(res.statusText || 'Request failed');
            err.status = res.status;
            err.data = data;
            throw err;
        }

        return data;
    },

    get(path, opts) { return this.request(path, { ...opts, method: 'GET' }); },
    post(path, body, opts) { return this.request(path, { ...opts, method: 'POST', body }); },
    put(path, body, opts) { return this.request(path, { ...opts, method: 'PUT', body }); },
    delete(path, opts) { return this.request(path, { ...opts, method: 'DELETE' }); },
};

export function setAuthToken(token){
    if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}