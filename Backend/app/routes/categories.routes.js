module.exports = (app) => {
    const authMiddleware = require('../middleware/auth.middleware');
    const categoriesController = require('../controllers/categories.controller');

    app.get('/categories', authMiddleware.authMiddleware, categoriesController.getCategories);
    app.get('/categories/:name/jokes/:lang', authMiddleware.authMiddleware, categoriesController.getCategoryByName);
};