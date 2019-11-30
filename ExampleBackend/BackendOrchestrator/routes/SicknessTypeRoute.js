const SicknessTypeController = require('../controller/SicknessTypeController')

module.exports = function (app) {
    app.route('/sickness')
        .get(SicknessTypeController.getAllSickness)
}