const loginController = require('../controller/loginController')

module.exports = function(app){
    app.route('/usr/loginAthlete').post(loginController.athleteLogin)
}