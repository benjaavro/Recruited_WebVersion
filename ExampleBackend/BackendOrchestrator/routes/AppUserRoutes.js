const ApplicationUserController = require('../controller/ApplicationUserController')

module.exports = function(app){
    app.route('/usr/login').post(ApplicationUserController.userLogin)
    app.route('/usr/create').post(ApplicationUserController.createUser)
}