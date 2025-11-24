const Database = require('better-sqlite3');
const db = new Database('./data.sqlite', { fileMustExist: true });
const axios = require('axios');

async function seed() {
  try {
    const cats = await axios.get('https://api.chucknorris.io/jokes/categories').then(r => r.data);

    const selectCategory = db.prepare('SELECT id FROM categories WHERE name = ?');
    const insertCategory = db.prepare('INSERT INTO categories (name) VALUES (?)');

    const selectJoke = db.prepare('SELECT id FROM jokes WHERE chuckId = ? OR content = ?');
    const insertJoke = db.prepare(`
      INSERT INTO jokes (chuckId, content, originalLang, categoryId)
      VALUES (?, ?, ?, ?)
    `);

    for (const name of cats) {
      // Comprobar si la categoría ya existe
      let category = selectCategory.get(name);
      if (!category) {
        insertCategory.run(name);
        category = selectCategory.get(name);
        console.log('Category added:', name);
      } else {
        console.log('Category exists, skipping:', name);
      }

      if (!category) {
        console.error("ERROR: category not found after insert:", name);
        continue;
      }

      // Insertar 30 chistes por categoría, sólo si no existen
      for (let i = 0; i < 30; i++) {
        const joke = await axios.get(`https://api.chucknorris.io/jokes/random?category=${name}`).then(r => r.data);

        const existingJoke = selectJoke.get(joke.id, joke.value);
        if (existingJoke) {
          console.log('Joke exists, skipping:', joke.id);
          continue;
        }

        insertJoke.run(joke.id, joke.value, 'en', category.id);
        console.log('Joke seeded:', joke.id);
      }
    }

    console.log('Seeding finished.');
  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    db.close();
  }
}

seed();
