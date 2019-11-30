const VendorController = require('../controller/VendorController')

module.exports = function(app){
    app.route('/vendor')
        .get(VendorController.getVendors);
}