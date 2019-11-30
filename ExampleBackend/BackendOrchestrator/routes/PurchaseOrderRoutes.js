const PurchaseOrderController = require('../controller/PurchaseOrderController')

module.exports = function (app) {
    app.route('/purchaseorder/:purchaseOrderId')
        .get(PurchaseOrderController.getPurchaseOrderByNumber)
    app.route('/purchaseorder/master')
        .post(PurchaseOrderController.createPurchaseOrderHead)
    app.route('/purchaseorder/detail')
        .post(PurchaseOrderController.createPurchaseOrderDetail)
    app.route('/purchaseorder/authorization/getunauthorized')
        .get(PurchaseOrderController.getUnauthorizedPurchaseOrders)
    app.route('/purchaseorder/authorize/:id')
        .put(PurchaseOrderController.authorizePurchaseOrder)
}