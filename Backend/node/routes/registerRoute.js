const registerController = require('../controller/registerController')

module.exports = function(app){
    app.route('/register/Athlete').post(registerController.athleteRegister)
    app.route('/register/Coach').post(registerController.coachRegister)
}