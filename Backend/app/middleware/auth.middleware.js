const jwt = require('../utils/jwt');

function authMiddleware(req, res, next){
    
    const authHeader = req.headers.authorization;
    
    if (!authHeader) return res.status(401).send({ error: 'El token no ha sido proporcionado' });
    
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || !/^Bearer$/i.test(parts[0])) {
        return res.status(401).send({ error: 'El token no tiene el formato Bearer' });
    }
    const token = parts[1];

    try {
        const payload = jwt.verifyToken(token, process.env.JWT_SECRET);
        req.email = payload.email.email;
        req.name = payload.email.name;
        next();
    } catch (err) {
        return res.status(401).send({ error: 'Token inválido o expirado' });
    }
}

module.exports = {
    authMiddleware
};