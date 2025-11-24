module.exports = (app) => {
    const authController = require('../controllers/auth.controller');
    const authMiddleware = require('../middleware/auth.middleware');

    app.post('/auth/login', authController.login);
    app.post('/auth/register', authController.register);
    app.post('/auth/logout', authMiddleware.authMiddleware, authController.logout);
    app.get('/auth/me', authMiddleware.authMiddleware, authController.getMe);
}