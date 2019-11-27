const SectionAnimalHistoryController = require('../controller/SectionAnimalHistoryController')

module.exports = function (app) {
    app.route('/sectionanimalhistory/save')
        .post(SectionAnimalHistoryController.saveTranslate)
}