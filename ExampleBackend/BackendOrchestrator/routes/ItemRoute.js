const ItemController = require('../controller/ItemController')

module.exports = function(app){
    app.route('/item')
        .get(ItemController.getItems)
        .post(ItemController.createAnItem);
    app.route('/item/categories')
        .get(ItemController.getItemsWithCategory);
}