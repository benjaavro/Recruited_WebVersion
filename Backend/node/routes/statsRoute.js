const statsController = require('../controller/statsController')

module.exports = function(app){
    app.route('/stats/Register').post(statsController.insert)
    app.route('/stats/Get').post(statsController.get)
    app.route('/stats/Edit').post(statsController.update)

}