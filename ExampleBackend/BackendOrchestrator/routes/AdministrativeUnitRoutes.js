const AdministrativeUnitController = require('../controller/AdministrativeUnitController')

module.exports = function(app){
    app.route('/ranch')
        .get(AdministrativeUnitController.getAllRanches)
    app.route('/ranch/costcenter/:ranch')
        .get(AdministrativeUnitController.getCostCentersOfRanch)
    app.route('/ranch/section/:ranch')
        .get(AdministrativeUnitController.getSectionsOfRanch)
    app.route('/ranch/user/:ranch')
        .get(AdministrativeUnitController.getUserCostCentersOfRanch)
}