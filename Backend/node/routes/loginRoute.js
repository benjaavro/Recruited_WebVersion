const loginController = require('../controller/loginController')

module.exports = function(app){
    app.route('/usr/login').post(loginController.userLogin)
}