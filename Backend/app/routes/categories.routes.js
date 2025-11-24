module.exports = (app) => {
    const authMiddleware = require('../middleware/auth.middleware');
    const categoriesController = require('../controllers/categories.controller');

    app.get('/categories', categoriesController.getCategories);
    app.get('/categories/:name/jokes/:lang', categoriesController.getCategoryByName);
};