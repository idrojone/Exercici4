const Database = require('better-sqlite3');
const db = new Database('./data.sqlite', { fileMustExist: true });

function createSession(userId, token) {
    if (!userId) throw new Error('userId is required');

    const sessionToken = token;
    const now = new Date().toISOString();

    const stmt = db.prepare(`
        INSERT INTO user_session (userId, sessionToken, startedAt, lastActivityAt, durationSeconds)
        VALUES (?, ?, ?, ?, 0)
    `);

    const result = stmt.run(userId, sessionToken, now, now);

    const getStmt = db.prepare('SELECT * FROM user_session WHERE id = ?');
    const session = getStmt.get(result.lastInsertRowid);

    return session;
}

function cerrarSesion(sessionToken) {
    if (!sessionToken) throw new Error('sessionToken is required');

    const row = db.prepare('SELECT * FROM user_session WHERE sessionToken = ?').get(sessionToken);
    if (!row) throw new Error('Invalid session token');
    const now = new Date();
    const started = row.startedAt ? new Date(row.startedAt) : now;
    const durationSeconds = Math.max(0, Math.floor((now.getTime() - started.getTime()) / 1000));
    const nowIso = now.toISOString();
    db.prepare('UPDATE user_session SET lastActivityAt = ?, durationSeconds = ? WHERE id = ?')
      .run(nowIso, durationSeconds, row.id);

    return true;
}

module.exports = {
    createSession,
    cerrarSesion
};
