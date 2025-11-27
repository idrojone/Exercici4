const axios = require('axios');

// app/utils/translate.js

const LIBRE_TRANSLATE_URL = 'http://127.0.0.1:5001/translate';

async function translate(text, target = 'en') {
    console.log(text);
    console.log(target);
    if (!text) return text;
    if (target === 'en') return text;

    const payload = {
        q: text,
        source: 'auto',
        target,
        format: 'text'
    };

    try {
        const res = await axios.post(LIBRE_TRANSLATE_URL, payload, {
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(res);
        return (res.data && res.data.translatedText) ?? '';
    } catch (err) {
        if (err.response) {
            const body = typeof err.response.data === 'string'
                ? err.response.data
                : JSON.stringify(err.response.data);
            throw new Error(`LibreTranslate error ${err.response.status}: ${body}`);
        }
        throw new Error(`LibreTranslate request failed: ${err.message}`);
    }
}

async function translateMany(texts = [], target = 'en') {
    if (target === 'en') return texts;
    return Promise.all(texts.map(t => translate(t, target)));
}

module.exports = { translate, translateMany };
