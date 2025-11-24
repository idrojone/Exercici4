const Database = require('better-sqlite3');
const db = new Database('./data.sqlite', { fileMustExist: true });
const translate = require('../utils/translate');

function getCategories(_, res) {
    const stmt = db.prepare('SELECT * FROM categories');
    const categories = stmt.all();
    res.json(categories);
}

async function getCategoryByName(req, res) { 
    const { name, lang } = req.params;
    const stmtCat = db.prepare('SELECT * FROM categories WHERE name = ?');
    const category = stmtCat.get(name);
    if (!category) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    const stmtJokes = db.prepare('SELECT * FROM jokes WHERE categoryId = ?');
    console.log(category.id);
    const jokes = stmtJokes.all(category.id);
    if (lang === 'es') {
        for (let joke of jokes) {
            joke.content = await translate.translate(joke.content, lang);
        }
    }
    res.json({ category, jokes });
}

module.exports = {
    getCategories,
    getCategoryByName
};