const ItemCardexController = require('../controller/ItemCardexController')

module.exports = function(app){
    app.route('/itemcardex/fulltransaction')
        .post(ItemCardexController.saveFullItemCardexTransaction);
    app.route('/itemcardex/inventory/:costCenter')
        .get(ItemCardexController.getCurrentInventory);
    app.route('/itemcardex/consult/:costCenterId/:dateFrom/:dateTo')
        .get(ItemCardexController.getItemCardexPerCostCenter)
    app.route('/itemcardex/inventory/existances/:costCenter')
        .get(ItemCardexController.getExistencesPerCostCenter)
    app.route('/itemcardex/inventory/existances/categories/:costCenter')
        .get(ItemCardexController.getCurrentExistanceForCostCenterWithItemCategory)
    app.route('/itemcardex/saveentries')
        .post(ItemCardexController.saveItemCardexEntries)
    app.route('/itemcardex/translateresult/:costCenter/:exitSequence')
        .get(ItemCardexController.getItemCardexPerExitSequence)
    app.route('/itemcardex/receivetransaction')
        .post(ItemCardexController.saveItemReceivalOfExchange)
}