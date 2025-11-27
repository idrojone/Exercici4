const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const Database = require('better-sqlite3');
const db = new Database('./data.sqlite', { fileMustExist: true });
const sessionController = require('./session.controller.js');

async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'El email y la contraseña son requeridos' });
    const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!row) return res.status(401).json({ message: 'Credenciales inválidas' });
    const passwordMatch = await bcrypt.compare(password, row.passwordHash);
    if (!passwordMatch) return res.status(401).json({ message: 'Credenciales inválidas' });
    const token = jwt.createToken(row.email, row.name, row.id);
    const session = await sessionController.createSession(row.id, token);
    if (!session) return res.status(500).json({ message: 'Error al crear la sesión del usuario' });
    return res.status(200).json({ accessToken: token, user: { email: row.email, name: row.name } });
}

async function register(req, res) {
    const { email, password, name } = req.body;
    if (!email || !password || !name) return res.status(400).json({ message: 'El email, la contraseña y el nombre son requeridos' });

    const passwordHash = await bcrypt.hash(password, 10);

    try {
        const stmt = db.prepare('INSERT INTO users (email, name, passwordHash) VALUES (?, ?, ?)');
        stmt.run(email, name, passwordHash);
        return res.status(201).json({ message: 'Usuario registrado exitosamente, Iniciando sesión...' });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'Error al registrar el usuario' });
    }
}

async function logout(req, res) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'No autorizado' });

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    try {
        const result = sessionController.cerrarSesion(token);
        if (!result) return res.status(400).json({ message: 'Error al cerrar la sesión' });
        return res.status(200).json({ message: 'Sesión cerrada exitosamente' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al cerrar la sesión' });
    }
}

async function getMe(req, res) {
    const name = req.name;
    const email = req.email;
    if (!name || !email) return res.status(401).json({ message: 'No autorizado' });
    return res.status(200).json({ email, name });
}

async function log(req, res) {
    const { jokes, lang } = req.body
    const userId = req.userId;

    try {
        jokes.forEach(id => {
            let stmt = db.prepare('INSERT INTO user_joke_views (userId, jokeId, langViewed) VALUES (?, ?, ?)');
            stmt.run(userId, id.id, lang);
        });

        return res.status(200).json('ok');
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al guardar el log' });
    }

    return res.status(200).json({ jokes, lang, userId })


}
module.exports = {
    login,
    register,
    logout,
    getMe,
    log
};
