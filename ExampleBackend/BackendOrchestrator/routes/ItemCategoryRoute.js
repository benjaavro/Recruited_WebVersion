const ItemCategoryController = require('../controller/ItemCategoryController')

module.exports = function(app){
    app.route('/item/category')
        .post(ItemCategoryController.createItemCategories);
}