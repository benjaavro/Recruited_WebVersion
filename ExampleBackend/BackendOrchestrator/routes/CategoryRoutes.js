const CategoryController = require('../controller/CategoryController')

module.exports = function(app){
    app.route('/categories')
        .get(CategoryController.getCategoriesFromParent)
    app.route('/categories/:category')
        .get(CategoryController.getCategoriesFromParent)
}