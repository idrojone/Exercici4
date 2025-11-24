const jwt = require('jsonwebtoken');

function createToken(email, name){
    return jwt.sign({ email, name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

function verifyToken(token){
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    createToken,
    verifyToken
};