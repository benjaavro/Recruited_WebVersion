const mobileController = require('../controller/mobileController')

module.exports = function(app){
    app.route('/mobile/get').post(mobileController.login)
    app.route('/mobile/insert').post(mobileController.insert)
}