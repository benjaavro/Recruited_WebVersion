const profileController = require('../controller/profileController')

module.exports = function(app){
    app.route('/profile/Athlete').post(profileController.athleteProfile)
    app.route('/profile/Coach').post(profileController.coachProfile)
    app.route('/profile/AthleteEdit').post(profileController.athleteProfileEdit)
    app.route('/profile/CoachEdit').post(profileController.coachProfileEdit)
}