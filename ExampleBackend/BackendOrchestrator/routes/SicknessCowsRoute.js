const  SicknessCowsController = require('../controller/SicknessCowsController')

module.exports = function(app){
    app.route('/sicknesscows/save')
        .post(SicknessCowsController.saveSickness)
    app.route('/sicknesscows/:disease/:earring')
        .get(SicknessCowsController.getLatestDiseaseCases)
}