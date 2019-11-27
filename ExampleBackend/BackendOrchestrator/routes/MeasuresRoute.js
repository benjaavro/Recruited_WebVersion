const MeasuresController = require('../controller/MeasuresController')

module.exports = function (app) {
    app.route('/measures/save')
        .post(MeasuresController.createMeasure)
    app.route('/measures/:animalEarringId')
        .get(MeasuresController.getMeasure)
}
