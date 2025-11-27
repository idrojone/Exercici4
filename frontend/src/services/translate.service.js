export async function translate(text, sourceLang, targetLang) {
    if (targetLang === 'en') return text;

    const payload = {
        q: text,
        source: sourceLang,
        target: targetLang,
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
        return text;
    }
}